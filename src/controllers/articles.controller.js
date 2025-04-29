const { selectArticleById } = require("../models/articles.models");

exports.getArticlesById = (request, response) => {
  const id = request.params.article_id;

  try {
    selectArticleById(id).then((rows) => {
      response.status(200).send(rows);
    });
  } catch (err) {
    next(err);
  }
};
