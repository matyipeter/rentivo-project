-- Drop the database if it exists
DROP DATABASE IF EXISTS rentivo;

-- Create the database
CREATE DATABASE rentivo;

-- Connect to the newly created database
\c rentivo

-- Create the suggestions table
CREATE TABLE suggestions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    suggestion TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);