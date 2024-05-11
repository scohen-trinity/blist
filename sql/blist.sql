CREATE TABLE hobbies (
    hobby_id SERIAL PRIMARY KEY,
    hobby_name VARCHAR(100) UNIQUE NOT NULL,
    hobby_description VARCHAR(1000) NOT NULL
);

INSERT INTO hobbies (hobby_name, hobby_description) VALUES
    ('Climbing', 'A sport where you go climb rocks'),
    ('Magic The Gathering', 'The best trading card game')

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(200) NOT NULL UNIQUE, 
    password VARCHAR(200) NOT NULL
);