const { deleteCommentBy } = require("../models/comments.models");
exports.deleteCommentById = (request, response) => {
  const { id } = request.params.comment_id;

  deleteCommentBy(id).then((result) => {
    console.log(result, "con");
    response.status(204).send(result);
  });
};
