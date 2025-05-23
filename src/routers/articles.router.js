const express = require("express");
const {
  getArticlesById,
  getArticles,
  getCommentsByArticleId,
  postArticle,
  postCommentByArticleId,
  patchArticleById,
} = require("../controllers/articles.controller");

const articlesRouter = express.Router();

articlesRouter.get("/", getArticles);
articlesRouter.get("/:article_id", getArticlesById);
articlesRouter.get("/:article_id/comments", getCommentsByArticleId);
articlesRouter.post("/:article_id/comments", postCommentByArticleId);
articlesRouter.post("/", postArticle);
articlesRouter.patch("/:article_id", patchArticleById);

module.exports = articlesRouter;
