const express = require("express");
const {
  validateCommentId,
  validatePatchComment,
} = require("../middleware/validateComment");
const {
  deleteCommentById,
  patchCommentById,
} = require("../controllers/comments.controller");

const commentsRouter = express.Router();

commentsRouter
  .route("/:comment_id")
  .delete(validateCommentId, deleteCommentById)
  .patch(validateCommentId, validatePatchComment, patchCommentById);

module.exports = commentsRouter;
