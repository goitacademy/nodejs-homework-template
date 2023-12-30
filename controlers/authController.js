const { userServices } = require("../services");

exports.signup = async (req, res) => {
  const { user, token } = userServices.singup(req.body);
  res.status(201).json({
    msg: "Success",
    user,
    token,
  });
};

exports.login = async (req, res) => {
  const { user, token } = userServices.login(req.body);
  res.status(200).json({
    msg: "Success",
    user,
    token,
  });
};
