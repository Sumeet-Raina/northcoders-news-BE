\c nc_news

DROP TABLE IF EXISTS topics;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS comments;

CREATE TABLE users (
    username VARCHAR(255) PRIMARY KEY,
    name  VARCHAR(60) NOT NULL,
    avatar_url VARCHAR(1000)
);

CREATE TABLE topics (
    slug VARCHAR(255) PRIMARY KEY,
    description  VARCHAR(600),
    img_url VARCHAR(1000)
);

CREATE TABLE articles(
    article_id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    topic VARCHAR(255),
    FOREIGN KEY (topic) REFERENCES topics(slug),
    author VARCHAR(255),
    FOREIGN KEY (author) REFERENCES users(username),
    body  TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    votes INTEGER DEFAULT 0,
    article_img_url VARCHAR(1000),
);

CREATE TABLE comments( 
    comment_id SERIAL PRIMARY KEY,
    article_id INTEGER NOT NULL,
    body TEXT,
    votes INTEGER DEFAULT 0, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    author VARCHAR(100) NOT NULL,
    FOREIGN KEY (author) REFERENCES users(username),
    FOREIGN KEY (article_id) REFERENCES articles(article_id)
);
