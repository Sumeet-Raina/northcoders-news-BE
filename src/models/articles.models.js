const db = require("../../db/connection");

exports.selectArticleById = async (articleId) => {
  const { rows } = await db.query(
    `
      SELECT 
        articles.*,
        COUNT(comments.comment_id)::INT AS comment_count
      FROM 
        articles
      LEFT JOIN 
        comments 
      ON 
        comments.article_id = articles.article_id
      WHERE 
        articles.article_id = $1
      GROUP BY 
        articles.article_id;
    `,
    [articleId]
  );
  return rows;
};

exports.selectAllArticles = async (sort_by, order, topic) => {
  if (topic) {
    const { rows } = await db.query(
      `SELECT * FROM articles WHERE topic = $1 ORDER BY ${sort_by} ${order}`,
      [topic]
    );
    return rows;
  }
  const { rows } = await db.query(
    `SELECT * FROM articles ORDER BY ${sort_by} ${order}`
  );
  return rows;
};

exports.selectCommentsByArticleId = async (id) => {
  const { rows } = await db.query(
    "SELECT * FROM comments where article_id = $1 ORDER BY created_at DESC;",
    [id]
  );
  return rows;
};

exports.insertCommentbyArticleId = async (article_id, author, body) => {
  const { rows } = await db.query(
    "INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *;",
    [article_id, author, body]
  );
  return rows[0];
};

exports.updateArticleById = async (article_id, inc_votes) => {
  const { rows } = await db.query(
    "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 returning *;",
    [inc_votes, article_id]
  );
  return rows[0];
};
