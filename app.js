const express = require("express");
const { getApi } = require("./src/controllers/api.controller");
const { getTopics } = require("./src/controllers/topics.controller");
const { getArticlesById } = require("./src/controllers/articles.controller");

const app = express();

app.get("/api", getApi);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticlesById);

module.exports = app;
