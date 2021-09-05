const { User } = require("../../model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const login = async (req, res, _next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Email or password is wrong",
    });
  }
  const hashPassword = user.password;
  const compareResult = bcrypt.compareSync(password, hashPassword);
  if (!compareResult) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Email or password is wrong",
    });
  }
  const payload = { id: user._id };
  const { SECRET_KEY } = process.env;
  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(user._id, { token });
  return res.status(200).json({
    status: "success",
    code: 200,
    data: { token },
  });
};
module.exports = login;
