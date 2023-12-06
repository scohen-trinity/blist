CREATE TABLE users (
    username VARCHAR(20) NOT NULL UNIQUE, 
    password VARCHAR(20) NOT NULL,
    weight INTEGER,  
    height_inches INTEGER,
    fitness_goal INTEGER,
    days INTEGER,
    PRIMARY KEY(username)
);

CREATE TABLE exercises (
    exercise_id INTEGER NOT NULL UNIQUE,
    exercise_name VARCHAR(20) NOT NULL,
    exercise_description VARCHAR(100) NOT NULL,
    exercise_link VARCHAR(100) NOT NULL,
    exercise_muscle_group VARCHAR(10) ARRAY NOT NULL,
    PRIMARY KEY (exercise_id)
);

CREATE TABLE workouts (
    workout_id INTEGER NOT NULL UNIQUE,
    exercise_id INTEGER NOT NULL REFERENCES exercises (exercise_id),
    PRIMARY KEY (workout_id, exercise_id)
);

CREATE TABLE assignments (
    username VARCHAR(20) NOT NULL REFERENCES users (username) ON DELETE CASCADE,
    workout_id INTEGER NOT NULL REFERENCES workouts (workout_id),
    date_assigned DATE NOT NULL,
    date_completed DATE, 
    reps INTEGER NOT NULL,
    sets INTEGER NOT NULL,
    rest_periods INTEGER NOT NULL,
    PRIMARY KEY (username, workout_id, date_assigned)
);