const express = require("express");
const {
  validateIdParam,
  validateGetArticlesQuery,
  validatePostArticle,
  validatePatchArticle,
  validatePostComment,
} = require("../middleware/validateArticles");
const {
  getArticles,
  getArticleById,
  postArticle,
  patchArticleById,
  deleteArticleById,
  getCommentsByArticleId,
  postCommentByArticleId,
} = require("../controllers/articles.controller");

const articlesRouter = express.Router();

articlesRouter
  .route("/")
  .get(getArticles)
  .post(validatePostArticle, postArticle);

articlesRouter
  .route("/:article_id")
  .all(validateIdParam)
  .get(getArticleById)
  .patch(validatePatchArticle, patchArticleById)
  .delete(deleteArticleById);

articlesRouter
  .route("/:article_id/comments")
  .all(validateIdParam)
  .get(getCommentsByArticleId)
  .post(validatePostComment, postCommentByArticleId);

module.exports = articlesRouter;
