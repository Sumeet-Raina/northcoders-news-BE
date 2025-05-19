const express = require("express");
const { getApi } = require("../controllers/api.controller");

const apiRouter = express.Router();

apiRouter.route("/").get(getApi);

module.exports = apiRouter;
