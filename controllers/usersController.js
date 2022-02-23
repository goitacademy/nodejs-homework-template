const { registrationUser } = require("../services/usersService");

const singupController = (req, res, next) => {
  const { email, password } = req.body;
  registrationUser(email, password);
};

module.exports = { singupController };
