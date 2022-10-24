const { users: usersOperations } = require("../../service");

const register = async (req, res) => {
  const user = await usersOperations.register(req.body);

  res.status(201).json({ status: "Created", user });
};


module.exports = register;