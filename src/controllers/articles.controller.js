const {
  selectArticleById,
  selectAllArticles,
  selectCommentsByArticleId,
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
