const express = require("express");
const { getUsers, getUserByName } = require("../controllers/users.controller");
const validateUsernameParam = require("../middleware/validateUserName");

const usersRouter = express.Router();

usersRouter.route("/").get(getUsers);
usersRouter.route("/:username").get(validateUsernameParam, getUserByName);

module.exports = usersRouter;
