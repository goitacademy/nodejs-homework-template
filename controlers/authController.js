const { userServices } = require("../services");

exports.signup = async (req, res) => {
  const { user, token } = userServices.singup(req.body);
  res.status(201).json({
    msg: "Сongratulations on registering",
    user,
    token,
  });
};

exports.login = async (req, res) => {
  const { user, token } = userServices.login(req.body);
  res.status(200).json({
    msg: "Welcome to login",
    user,
    token,
  });
};
