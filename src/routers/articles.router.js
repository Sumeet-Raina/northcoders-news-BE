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

articlesRouter.get("/", getArticles);
articlesRouter.get("/:article_id", getArticleById);
articlesRouter.delete("/:article_id", deleteArticleById);
articlesRouter.get("/:article_id/comments", getCommentsByArticleId);
articlesRouter.post("/:article_id/comments", postCommentByArticleId);
articlesRouter.post("/", postArticle);
articlesRouter.patch("/:article_id", patchArticleById);

module.exports = articlesRouter;
