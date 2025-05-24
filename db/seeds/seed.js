const db = require("../connection");
const format = require("pg-format");
const { convertTimestampToDate, createRef } = require("../seeds/utils");

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db
    .query(`DROP TABLE IF EXISTS comments;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS articles;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS topics;`);
    })
    .then(() => {
      return db.query(`CREATE TABLE users (
      username VARCHAR(255) PRIMARY KEY,
      name  VARCHAR(60) NOT NULL,
      avatar_url VARCHAR(1000));`);
    })
    .then(() => {
      return db.query(`CREATE TABLE topics (
      slug VARCHAR(255) PRIMARY KEY,
      description  VARCHAR(600),
      img_url VARCHAR(1000));`);
    })
    .then(() => {
      return db.query(`CREATE TABLE articles(
      article_id SERIAL PRIMARY KEY,
      title VARCHAR(100),
      topic VARCHAR(255),
      author VARCHAR(255),
      body  TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      votes INTEGER DEFAULT 0,
      article_img_url VARCHAR(1000),
      FOREIGN KEY (topic) REFERENCES topics(slug),
      FOREIGN KEY (author) REFERENCES users(username));`);
    })
    .then(() => {
      return db.query(`CREATE TABLE comments( 
      comment_id SERIAL PRIMARY KEY,
      article_id INTEGER NOT NULL,
      body TEXT,
      votes INTEGER DEFAULT 0, 
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      author VARCHAR(100) NOT NULL,
      FOREIGN KEY (author) REFERENCES users(username),
      FOREIGN KEY (article_id) REFERENCES articles(article_id) ON DELETE CASCADE)`);
    })
    .then(() => {
      const usersTableData = userData.map((user) => {
        return [user.username, user.name, user.avatar_url];
      });
      const insertUsersQuery = format(
        `INSERT INTO users(username, name, avatar_url) VALUES %L`,
        usersTableData
      );
      return db.query(insertUsersQuery);
    })
    .then(() => {
      const topicsTableData = topicData.map((topic) => {
        return [topic.slug, topic.description, topic.img_url];
      });
      const insertTopicsQuery = format(
        `INSERT INTO topics(slug, description, img_url) VALUES %L`,
        topicsTableData
      );
      return db.query(insertTopicsQuery);
    })
    .then(() => {
      const articlesTableData = articleData.map((article) => {
        const formattedArticle = convertTimestampToDate(article);
        return [
          formattedArticle.title,
          formattedArticle.topic,
          formattedArticle.author,
          formattedArticle.body,
          formattedArticle.created_at,
          formattedArticle.votes,
          formattedArticle.article_img_url,
        ];
      });
      const insertArticlesQuery = format(
        `INSERT INTO articles(title, topic, author, body, created_at, votes, article_img_url) VALUES %L RETURNING *`,
        articlesTableData
      );
      return db.query(insertArticlesQuery);
    })
    .then((result) => {
      const articlesRefObject = createRef(result.rows);
      const commentsTableData = commentData.map((comment) => {
        const formattedComments = convertTimestampToDate(comment);
        return [
          articlesRefObject[comment.article_title],
          formattedComments.body,
          formattedComments.votes,
          formattedComments.author,
          formattedComments.created_at,
        ];
      });

      const insertCommentsQuery = format(
        `INSERT INTO comments(article_id, body, votes, author, created_at) VALUES %L`,
        commentsTableData
      );

      return db.query(insertCommentsQuery);
    })
    .then(() => {
      console.log("Seed completed");
    });
};

module.exports = seed;
