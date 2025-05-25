const { selectTopics, createTopic } = require("../models/topics.models");

exports.getTopics = async (req, res, next) => {
  try {
    const rows = await selectTopics();
    return res.status(200).json({ topics: rows });
  } catch (err) {
    next(err);
  }
};

exports.postTopic = async (req, res, next) => {
  try {
    const { slug, description, img_url } = req.validatedBody;
    const row = await createTopic(slug, description, img_url);
    return res.status(201).json({ topic: row });
  } catch (err) {
    return next(err);
  }
};
// 1️⃣ Always use the validated payload
// 2️⃣ Call model
// 3️⃣ Send 201 with the new topic
// 4️⃣ Any DB or other error goes to error handler
