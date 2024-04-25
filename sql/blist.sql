CREATE TABLE hobbies (
    hobby_id SERIAL PRIMARY KEY,
    hobby_name VARCHAR(100) UNIQUE NOT NULL,
    hobby_description VARCHAR(1000)
);

INSERT INTO hobbies (hobby_name, hobby_description) VALUES
    ('Climbing', 'A sport where you go climb rocks'),
    ('Magic The Gathering', 'The best trading card game')