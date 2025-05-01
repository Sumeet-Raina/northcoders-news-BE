const { deleteCommentBy } = require("../models/comments.models");
exports.deleteCommentById = (request, response) => {
  const { id } = request.params.comment_id;

  deleteCommentBy(id).then((result) => {
    response.status(204).send(result);
  });
};
