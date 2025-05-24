const express = require("express");
const {
  getArticleById,
  getArticles,
  getCommentsByArticleId,
  postArticle,
  postCommentByArticleId,
  patchArticleById,
  deleteArticleById,
} = require("../controllers/articles.controller");

const articlesRouter = express.Router();
articlesRouter.route("/").get(getArticles).post(postArticle);

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .delete(deleteArticleById)
  .patch(patchArticleById);

articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(postCommentByArticleId);

module.exports = articlesRouter;
