const express = require("express");
const { getApi } = require("./src/controllers/api.controller");
const { getTopics } = require("./src/controllers/topics.controller");
const app = express();

app.get("/api", getApi);

app.get("/api/topics", getTopics);

module.exports = app;
