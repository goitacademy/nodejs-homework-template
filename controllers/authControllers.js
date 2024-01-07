const { signupServicesValidate } = require("../services/userServices");

exports.signup = async (req, res) => {
  const { user, token } = await signupServicesValidate(req.body);
  res.status(201).json({ msg: "signup successful" });
};
exports.login = async (req, res) => {};
