const db = require("../../db/connection");

exports.selectAllUsers = async () => {
  const rows = await db.query("SELECT * FROM users");
  return rows;
};

exports.selectUserByUserName = async (username) => {
  const rows = await db.query(
    "SELECT username, name, avatar_url FROM users where username = $1",
    [username]
  );
  console.log(rows, "<==== R");
  return rows;
};
