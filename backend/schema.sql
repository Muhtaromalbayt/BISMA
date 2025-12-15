DROP TABLE IF EXISTS rules;
CREATE TABLE rules (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    iconName TEXT NOT NULL,
    description TEXT NOT NULL,
    explanation TEXT NOT NULL,
    examples TEXT NOT NULL -- JSON string
);

DROP TABLE IF EXISTS content_settings;
CREATE TABLE content_settings (
    id TEXT PRIMARY KEY, -- always 'default'
    data TEXT NOT NULL -- JSON string containing all settings
);

DROP TABLE IF EXISTS admins;
CREATE TABLE admins (
    username TEXT PRIMARY KEY,
    password TEXT NOT NULL
);

-- Insert default admin
INSERT INTO admins (username, password) VALUES ('admin', 'bisma2025');
