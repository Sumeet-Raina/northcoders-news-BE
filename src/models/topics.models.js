const db = require("../../db/connection");

exports.selectTopics = async () => {
  const topics = await db.query(`SELECT slug, description FROM topics`);
  return topics.rows;
};

exports.createTopic = async (slug, description) => {
  const result = await db.query(
    `INSERT INTO TOPICS (slug, description) VALUES ($1, $2) RETURNING *;`,
    [slug, description]
  );

  return result.rows[0];
};
