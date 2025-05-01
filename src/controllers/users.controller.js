const { selectAllUsers } = require("../models/users.model");

exports.getUsers = (request, response) => {
  selectAllUsers().then(({ rows }) => {
    response.status(200).send({ users: rows });
  });
};
