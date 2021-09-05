const { UserMethods } = require("../../repositories");
const { User } = require("../../model");
const bcrypt = require("bcryptjs");
const register = async (req, res, _next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Already register",
    });
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  console.log(hashPassword);
  const result = await UserMethods.addUser({ email, password: hashPassword });
  return res.status(201).json({
    status: "success",
    code: 201,
    data: { email, password },
  });
};
module.exports = register;
