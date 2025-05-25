const {
  selectAllUsers,
  selectUserByUserName,
} = require("../models/users.model");

exports.getUsers = async (req, res, next) => {
  try {
    const { rows } = await selectAllUsers();
    return res.status(200).json({ users: rows });
  } catch (err) {
    next(err);
  }
};

exports.getUserByName = async (req, res, next) => {
  try {
    const { rows } = await selectUserByUserName(req.validatedUsername);
    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ user: rows[0] });
  } catch (err) {
    next(err);
  }
};
