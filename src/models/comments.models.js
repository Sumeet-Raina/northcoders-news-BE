const db = require("../../db/connection");

exports.deleteCommentBy = (comment_id) => {
  const result = db.query("DELETE FROM comments WHERE comment_id= $1", [
    comment_id,
  ]);
  return result;
};

exports.updateCommentById = async (comment_id, inc_votes) => {
  const { rows } = await db.query(
    "UPDATE comments SET votes = votes + $1 WHERE comment_id = $2 returning *;",
    [inc_votes, comment_id]
  );
  return rows[0];
};
