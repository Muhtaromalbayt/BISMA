import React from 'react';
import { ASTNode, parseMath } from '../utils/mathspeak';

interface MathRendererProps {
    expression: string;
    className?: string;
}

const NodeRenderer: React.FC<{ node: ASTNode }> = ({ node }) => {
    if (!node) return null;

    switch (node.type) {
        case 'fraction':
            return (
                <div className="inline-flex flex-col items-center mx-1 align-middle">
                    <div className="border-b-2 border-current w-full text-center px-1 pb-0.5">
                        <NodeRenderer node={node.numerator!} />
                    </div>
                    <div className="w-full text-center px-1 pt-0.5">
                        <NodeRenderer node={node.denominator!} />
                    </div>
                </div>
            );

        case 'mixed':
            return (
                <div className="inline-flex items-center gap-1 align-middle">
                    <span>{node.whole}</span>
                    <NodeRenderer node={{
                        type: 'fraction',
                        numerator: node.numerator,
                        denominator: node.denominator
                    }} />
                </div>
            );

        case 'operation':
            return (
                <div className="inline-flex items-center gap-1 align-middle">
                    <NodeRenderer node={node.left!} />
                    <span className="mx-1">{node.operator}</span>
                    <NodeRenderer node={node.right!} />
                </div>
            );

        case 'group':
            return (
                <div className="inline-flex items-center align-middle">
                    <span className="text-lg mx-0.5">(</span>
                    <NodeRenderer node={node.content!} />
                    <span className="text-lg mx-0.5">)</span>
                </div>
            );

        case 'function':
            if (node.value === 'sqrt') {
                return (
                    <div className="inline-flex items-center align-middle gap-0.5">
                        <span className="text-xl leading-none">√</span>
                        <div className="border-t border-current pt-0.5">
                            <NodeRenderer node={node.content!} />
                        </div>
                    </div>
                );
            }
            return (
                <span>
                    {node.value}(<NodeRenderer node={node.content!} />)
                </span>
            );

        case 'symbol':
        default:
            return <span>{node.value}</span>;
    }
};

export default function MathRenderer({ expression, className = '' }: MathRendererProps) {
    const ast = parseMath(expression);

    return (
        <div className={`font-mono text-xl inline-block ${className}`}>
            <NodeRenderer node={ast} />
        </div>
    );
}
