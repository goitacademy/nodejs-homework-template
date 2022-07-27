const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const passCompare = bcrypt.compareSync(password, user.password);

  if (!user || !passCompare) {
    return res.status(401).json({
      status: "error",
      code: 401,
      data: "Unauthorized",
      message: "Email or password is wrong",
    });
  }
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    status: 200,
    user: {
      token,
      email: user.email,
      subscription: user.subscription,
    },
  });
};
module.exports = login;
