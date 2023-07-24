const { User } = require("../../models");
const { ctrlWrap, ApiError } = require("../../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("email :>> ", email);
  const user = await User.findOne({ email });
  console.log("user:>> ", user);
  if (!user) {
    throw ApiError(401, "Email or password is wrong");
  }
  console.log("password :>> ", password);

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw ApiError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  res.status(200).json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
};

module.exports = ctrlWrap(login);
