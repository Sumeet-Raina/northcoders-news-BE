const express = require("express");
const { getUsers, getUserByName } = require("../controllers/users.controller");

const usersRouter = express.Router();

usersRouter.route("/").get(getUsers);

usersRouter.route("/:username").get(getUserByName);

module.exports = usersRouter;
