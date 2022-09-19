const { users: operations } = require("../../services");

const register = async (req, res) => {
  const user = await operations.register(req.body);

  res.status(201).json({ status: "Created", user });
};

module.exports = register;
