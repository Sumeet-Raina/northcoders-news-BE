const db = require("../../db/connection");

exports.deleteCommentBy = (comment_id) => {
  const result = db.query("DELETE FROM comments WHERE comment_id= $1", [
    comment_id,
  ]);
  return result;
};
