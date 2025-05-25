const {
  selectArticleById,
  selectAllArticles,
  selectCommentsByArticleId,
  insertCommentbyArticleId,
  updateArticleById,
  insertArticle,
  deleteArticle,
} = require("../models/articles.models");

exports.getArticleById = async (req, res, next) => {
  try {
    const rows = await selectArticleById(req.articleId);
    if (!rows.length) {
      const err = new Error("Article not found");
      err.status = 404;
      throw err;
    }
    return res.status(200).json(rows[0]);
  } catch (err) {
    return next(err);
  }
};
exports.getArticles = async (req, res, next) => {
  try {
    const { sort_by = "created_at", order = "desc", topic } = req.query;

    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;

    const rows = await selectAllArticles(sort_by, order, topic, limit, page);
    return res.status(200).json({ articles: rows });
  } catch (err) {
    return next(err);
  }
};

exports.getCommentsByArticleId = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;

    const rows = await selectCommentsByArticleId(req.articleId, limit, page);
    if (!rows.length) {
      const err = new Error("Article not found");
      err.status = 404;
      throw err;
    }
    return res.status(200).json({ comments: rows });
  } catch (err) {
    return next(err);
  }
};

exports.postCommentByArticleId = async (req, res, next) => {
  try {
    const { username: author, body } = req.validatedBody;
    const comment = await insertCommentbyArticleId(req.articleId, author, body);
    return res.status(201).json({ comment });
  } catch (err) {
    return next(err);
  }
};

exports.patchArticleById = async (req, res, next) => {
  try {
    const article = await updateArticleById(
      req.articleId,
      req.patchData.inc_votes
    );
    return res.status(200).json({ article });
  } catch (err) {
    return next(err);
  }
};

exports.postArticle = async (req, res, next) => {
  try {
    const article = await insertArticle(req.validatedBody);
    return res.status(201).json({ article });
  } catch (err) {
    return next(err);
  }
};

exports.deleteArticleById = async (req, res, next) => {
  try {
    await deleteArticle(req.articleId);
    return res.sendStatus(204);
  } catch (err) {
    return next(err);
  }
};
