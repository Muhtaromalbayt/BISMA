/**
 * Mengubah ekspresi matematika menjadi teks MathSpeak Bahasa Indonesia
 * Mendukung aturan Chapter 7 (Simple, Nested, Nested Twice Fractions)
 */

export type NodeType = 'fraction' | 'mixed' | 'operation' | 'group' | 'symbol' | 'function';

export interface ASTNode {
    type: NodeType;
    value?: string;
    left?: ASTNode;
    right?: ASTNode;
    operator?: string;
    whole?: string; // For mixed fractions
    numerator?: ASTNode;
    denominator?: ASTNode;
    content?: ASTNode;
}

// Tokenizer
function tokenize(expression: string): string[] {
    // Handle sqrt specially to ensure it's tokenized correctly
    let processed = expression.replace(/sqrt/g, ' sqrt ');
    return processed
        .replace(/([+\-×*÷/=()<>≤≥])/g, ' $1 ')
        .trim()
        .split(/\s+/)
        .filter(t => t.length > 0);
}

// Parser
class Parser {
    tokens: string[];
    pos: number = 0;

    constructor(tokens: string[]) {
        this.tokens = tokens;
    }

    peek(): string {
        return this.tokens[this.pos];
    }

    consume(): string {
        return this.tokens[this.pos++];
    }

    parse(): ASTNode {
        return this.parseExpression();
    }

    parseExpression(): ASTNode {
        let left = this.parseTerm();

        while (this.pos < this.tokens.length) {
            const op = this.peek();
            if (['+', '-', '=', '<', '>', '≤', '≥'].includes(op)) {
                this.consume();
                const right = this.parseTerm();
                left = { type: 'operation', operator: op, left, right };
            } else {
                break;
            }
        }
        return left;
    }

    parseTerm(): ASTNode {
        let left = this.parseFactor();

        while (this.pos < this.tokens.length) {
            const op = this.peek();
            if (['*', '×', '/', '÷'].includes(op)) {
                this.consume();
                const right = this.parseFactor();
                if (op === '/' || op === '÷') {
                    // Treat division as fraction
                    left = { type: 'fraction', numerator: left, denominator: right };
                } else {
                    left = { type: 'operation', operator: op, left, right };
                }
            } else {
                break;
            }
        }
        return left;
    }

    parseFactor(): ASTNode {
        const token = this.peek();

        if (token === '(') {
            this.consume();
            const expr = this.parseExpression();
            if (this.peek() === ')') this.consume();
            return { type: 'group', content: expr };
        }

        // Handle sqrt function
        if (token === 'sqrt') {
            this.consume();
            if (this.peek() === '(') {
                this.consume();
                const expr = this.parseExpression();
                if (this.peek() === ')') this.consume();
                return { type: 'function', value: 'sqrt', content: expr };
            }
        }

        // Handle Mixed Fraction: "2 1/2" -> tokens: "2", "1", "/", "2"
        if (/^\d+$/.test(token)) {
            if (this.pos + 1 < this.tokens.length && /^\d+$/.test(this.tokens[this.pos + 1])) {
                if (this.pos + 2 < this.tokens.length && ['/', '÷'].includes(this.tokens[this.pos + 2])) {
                    const whole = this.consume();
                    const num = this.consume();
                    this.consume(); // /
                    const den = this.consume();
                    return {
                        type: 'mixed',
                        whole,
                        numerator: { type: 'symbol', value: num },
                        denominator: { type: 'symbol', value: den }
                    };
                }
            }
        }

        this.consume();
        return { type: 'symbol', value: token };
    }
}

// Analyzer: Calculate Fraction Depth
function getFractionDepth(node: ASTNode): number {
    if (!node) return 0;
    if (node.type === 'symbol') return 0;
    if (node.type === 'group') return getFractionDepth(node.content!);
    if (node.type === 'function') return getFractionDepth(node.content!);
    if (node.type === 'mixed') return 1; // Mixed is depth 1

    if (node.type === 'fraction') {
        const depthLeft = getFractionDepth(node.numerator!);
        const depthRight = getFractionDepth(node.denominator!);
        return 1 + Math.max(depthLeft, depthRight);
    }

    if (node.type === 'operation') {
        return Math.max(getFractionDepth(node.left!), getFractionDepth(node.right!));
    }

    return 0;
}

// Generator: Generate MathSpeak Text
function generateMathSpeak(node: ASTNode): string {
    if (!node) return '';

    if (node.type === 'symbol') {
        return node.value || '';
    }

    if (node.type === 'group') {
        return `buka kurung, ${generateMathSpeak(node.content!)}, tutup kurung`;
    }

    if (node.type === 'function') {
        if (node.value === 'sqrt') {
            return `akar dari ${generateMathSpeak(node.content!)}`;
        }
        return `${node.value} dari ${generateMathSpeak(node.content!)}`;
    }

    if (node.type === 'mixed') {
        const num = generateMathSpeak(node.numerator!);
        const den = generateMathSpeak(node.denominator!);
        return `${node.whole} dan ${num} per ${den}`;
    }

    if (node.type === 'fraction') {
        const depth = getFractionDepth(node);
        const numText = generateMathSpeak(node.numerator!);
        const denText = generateMathSpeak(node.denominator!);

        if (depth === 1) {
            return `Mulai Pecahan, ${numText}, Per, ${denText}, Selesai Pecahan`;
        } else if (depth === 2) {
            return `Mulai Mulai Pecahan, ${numText}, Per Per, ${denText}, Selesai Selesai Pecahan`;
        } else {
            return `Mulai Mulai Mulai Pecahan, ${numText}, Per Per Per, ${denText}, Selesai Selesai Selesai Pecahan`;
        }
    }

    if (node.type === 'operation') {
        const left = generateMathSpeak(node.left!);
        const right = generateMathSpeak(node.right!);
        let opText = '';
        switch (node.operator) {
            case '+': opText = 'tambah'; break;
            case '-': opText = 'kurang'; break;
            case '*': case '×': opText = 'kali'; break;
            case '=': opText = 'sama dengan'; break;
            case '<': opText = 'lebih kecil dari'; break;
            case '>': opText = 'lebih besar dari'; break;
            case '≤': opText = 'lebih kecil sama dengan'; break;
            case '≥': opText = 'lebih besar sama dengan'; break;
            default: opText = node.operator || '';
        }
        return `${left}, ${opText}, ${right}`;
    }

    return '';
}

export function parseMath(expression: string): ASTNode {
    if (!expression) return { type: 'symbol', value: '' };
    try {
        const tokens = tokenize(expression);
        const parser = new Parser(tokens);
        return parser.parse();
    } catch (e) {
        console.error("Parse Error", e);
        return { type: 'symbol', value: expression };
    }
}

export function toMathSpeak(expression: string): string {
    if (!expression) return '';
    try {
        const tokens = tokenize(expression);
        const parser = new Parser(tokens);
        const ast = parser.parse();
        let text = generateMathSpeak(ast);
        text = text.replace(/,\s*,/g, ',').trim();
        return text;
    } catch (e) {
        console.error("MathSpeak Parse Error", e);
        return expression;
    }
}
