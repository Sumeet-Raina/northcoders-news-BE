const db = require("../../db/connection");

exports.selectArticleById = async (articleId) => {
  const { rows } = await db.query(
    "SELECT * FROM articles WHERE article_id = $1",
    [articleId]
  );
  return rows;
};

exports.selectAllArticles = async () => {
  const { rows } = await db.query("SELECT * FROM articles;");
  return rows;
};

exports.selectCommentsByArticleId = async (id) => {
  const { rows } = await db.query(
    "SELECT * FROM comments where article_id = $1 ORDER BY created_at DESC;",
    [id]
  );
  return rows;
};
