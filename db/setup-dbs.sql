DROP DATABASE IF EXISTS nc_news;
CREATE DATABASE nc_news;

DROP DATABASE IF EXISTS nc_news_test;
CREATE DATABASE nc_news_test;


CREATE TABLE users (
    username VARCHAR(255) PRIMARY KEY,
    name  VARCHAR(60) NOT NULL,
    avatar_url VARCHAR(600)
);

CREATE TABLE topics (
    slug VARCHAR(255) PRIMARY KEY,
    description  VARCHAR(600),
    img_url VARCHAR(600)
);

CREATE TABLE articles(
article_id SERIAL PRIMARY KEY,
title VARCHAR(100),
topic VARCHAR(255),
author VARCHAR(255),
body  TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
votes INTEGER DEFAULT 0,
article_img_url VARCHAR(600),
FOREIGN KEY (author) REFERENCES users(username),
FOREIGN KEY (topic) REFERENCES topics(slug),
);

CREATE TABLE comments( 
   comment_id SERIAL PRIMARY KEY,
   body VARCHAR(600),
   votes INTEGER DEFAULT 0, 
   created_at IMESTAMP DEFAULT CURRENT_TIMESTAMP,
   author VARCHAR(100) NOT NULL,
   article_id INTEGER NOT NULL,
   FOREIGN KEY (author) REFERENCES users(username)
   FOREIGN KEY (article_id) REFERENCES articles(article_id)
)





