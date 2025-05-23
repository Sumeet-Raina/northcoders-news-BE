const {
  deleteCommentBy,
  updateCommentById,
} = require("../models/comments.models");

exports.deleteCommentById = (request, response) => {
  const id = request.params.comment_id;

  deleteCommentBy(id).then((result) => {
    response.status(204).send(result);
  });
};

exports.patchCommentById = async (request, response) => {
  const id = request.params.comment_id;
  const { inc_votes } = request.body;
  await updateCommentById(id, inc_votes).then((row) => {
    response.status(200).send({ comment: row });
  });
};
