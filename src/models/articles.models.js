const db = require("../../db/connection");

exports.selectArticleById = async (articleId) => {
  const { rows } = await db.query(
    "SELECT * FROM articles WHERE article_id = $1",
    [articleId]
  );
  return rows;
};
