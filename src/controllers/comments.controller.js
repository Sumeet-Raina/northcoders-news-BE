const {
  deleteCommentBy,
  updateCommentById,
} = require("../models/comments.models");

exports.deleteCommentById = async (req, res, next) => {
  try {
    await deleteCommentBy(req.commentId);
    return res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

exports.patchCommentById = async (req, res, next) => {
  try {
    const updated = await updateCommentById(
      req.commentId,
      req.patchData.inc_votes
    );
    return res.status(200).json({ comment: updated });
  } catch (err) {
    next(err);
  }
};
