const {
  selectAllUsers,
  selectUserByUserName,
} = require("../models/users.model");

exports.getUsers = (request, response) => {
  selectAllUsers().then(({ rows }) => {
    response.status(200).send({ users: rows });
  });
};

exports.getUserByName = (request, response) => {
  const userName = request.params.username;
  selectUserByUserName(userName).then(({ rows }) => {
    response.status(200).send({ user: rows });
  });
};
