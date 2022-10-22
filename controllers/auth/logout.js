const { User } = require("../../models/users");

const logout = async (req, res) => {
  const { _id } = req.body;
  User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({ message: "No Content" });
};

module.exports = logout;
