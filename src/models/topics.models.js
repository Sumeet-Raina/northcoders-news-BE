const db = require("../../db/connection");

exports.selectTopics = async () => {
  const topics = await db.query(
    "SELECT slug, description FROM topics OFFSET 0 LIMIT 10"
  );
  return topics.rows;
};
