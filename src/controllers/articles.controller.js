const {
  selectArticleById,
  selectAllArticles,
  selectCommentsByArticleId,
  insertCommentbyArticleId,
  updateArticleById,
} = require("../models/articles.models");

exports.getArticlesById = async (request, response) => {
  const id = request.params.article_id;
  await selectArticleById(id).then((rows) => {
    console.log(rows);
    if (rows.length === 0) {
      const error = new Error("Article not found");
      error.status = 404;
      throw error;
    }

    response.status(200).send(rows);
  });
};

exports.getArticles = (request, response) => {
  selectAllArticles().then((rows) => {
    response.status(200).send({ articles: rows });
  });
};

exports.getCommentsByArticleId = async (request, response) => {
  const id = request.params.article_id;
  await selectCommentsByArticleId(id).then((rows) => {
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
