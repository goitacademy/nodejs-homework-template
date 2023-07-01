const { User } = require("../../models/user");
const HttpError = require("../../helpers/HttpError");

const register = async (req, res, next) => {
  const newUser = User.create(req.body);
  res.json({
    name: newUser.name,
    email: newUser.email,
  });
};

module.exports = register;
