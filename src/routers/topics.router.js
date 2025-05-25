const express = require("express");
const { getTopics, postTopic } = require("../controllers/topics.controller");
const { validateTopic } = require("../middleware/validateTopic");

const topicsRouter = express.Router();

topicsRouter.route("/").get(getTopics).post(validateTopic, postTopic);

module.exports = topicsRouter;
