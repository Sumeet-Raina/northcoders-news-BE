const { selectTopics, createTopic } = require("../models/topics.models");

exports.getTopics = (request, response) => {
  try {
    selectTopics().then((rows) => {
      response.status(200).send({ topics: rows });
    });
  } catch (err) {
    next(err);
  }
};

exports.postTopic = (request, response) => {
  const { slug, description } = request.body;

  createTopic(slug, description).then((row) => {
    response.status(201).send({ topic: row });
  });
};
