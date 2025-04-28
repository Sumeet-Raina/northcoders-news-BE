const db = require("../../db/connection");

exports.selectTopics = async () => {
  const topics = await db.query("SELECT slug, description FROM topics;");
  return topics.rows;
};
