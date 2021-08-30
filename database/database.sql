create TABLE person(
    id SERIAL PRIMARY KEY,
    login VARCHAR(255),
    password VARCHAR(255),
    subscription BOOLEAN,
    book_count INTEGER    
);

create TABLE book(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES person (id)    
);