const {
  selectArticleById,
  selectAllArticles,
  selectCommentsByArticleId,
  insertCommentbyArticleId,
  updateArticleById,
  insertArticle,
  deleteArticle,
} = require("../models/articles.models");

exports.getArticleById = async (request, response) => {
  const id = request.params.article_id;
  await selectArticleById(id).then((rows) => {
    if (rows.length === 0) {
      const error = new Error("Article not found");
      error.status = 404;
      throw error;
    }

    response.status(200).send(rows);
  });
};

exports.getArticles = async (request, response) => {
  const { sort_by = "created_at", order = "desc", topic } = request.query;
  const limit = parseInt(request.query.limit) || 10;
  const page = parseInt(request.query.page) || 1;

  try {
    await selectAllArticles(sort_by, order, topic, limit, page).then((rows) => {
      response.status(200).send({ articles: rows });
    });
  } catch (err) {
    next(err);
  }
};

exports.getCommentsByArticleId = async (request, response) => {
  const id = request.params.article_id;
  const limit = parseInt(request.query.limit) || 10;
  const page = parseInt(request.query.page) || 1;

  await selectCommentsByArticleId(id, limit, page).then((rows) => {
    if (rows.length === 0) {
      const error = new Error("Article not found");
      error.status = 404;
      throw error;
    }
    response.status(200).send({ comments: rows });
  });
};

exports.postCommentByArticleId = async (request, response) => {
  const { article_id } = request.params;
  const { username: author, body } = request.body;

  await insertCommentbyArticleId(article_id, author, body).then((row) => {
    response.status(201).send({ comment: row });
  });
};

exports.patchArticleById = async (request, response) => {
  const { article_id: id } = request.params;
  const { inc_votes } = request.body;

  await updateArticleById(id, inc_votes).then((row) => {
    response.status(200).send({ article: row });
  });
};

exports.postArticle = (req, res, next) => {
  const { author, title, body, topic, article_img_url } = req.body;

  if (!author || !title || !body || !topic) {
    return res.status(400).send({ msg: "Missing required fields" });
  }

  insertArticle({ author, title, body, topic, article_img_url }).then(
    (article) => {
      res.status(201).send({ article });
    }
  );
};

exports.deleteArticleById = (request, response) => {
  const id = request.params.article_id;

  deleteArticle(id).then(() => {
    response.status(204).send();
  });
};
