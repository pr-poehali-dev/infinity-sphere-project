CREATE TABLE leads (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    contact_method VARCHAR(100),
    furniture TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);