const { selectTopics } = require("../models/topics.models");

exports.getTopics = (request, response) => {
  try {
    selectTopics().then((rows) => {
      response.status(200).send({ topics: rows });
    });
  } catch (err) {
    next(err);
  }
};
