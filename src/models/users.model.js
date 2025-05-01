const db = require("../../db/connection");

exports.selectAllUsers = () => {
  const rows = db.query("SELECT * FROM users");
  return rows;
};
