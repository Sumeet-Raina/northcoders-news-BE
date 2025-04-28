const express = require("express");
const { getApi } = require("./src/controllers/api.controller");
const app = express();

app.get("/api", getApi);

module.exports = app;
