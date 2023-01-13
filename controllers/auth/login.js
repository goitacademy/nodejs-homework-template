const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const RequestError = require("../../helpers/RequestError");
const User = require("../../models/auth");
const schema = require("../../schemas/schemas");

const login = async (req, res) => {
  const { email, password } = req.body;
  const { error } = schema.login.validate(req.body);

  if (error) {
    throw RequestError(400);
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401, `There is no user with email ${email}`);
  }

  const comparedPass = await bcrypt.compare(password, user.password);
  if (!comparedPass) {
    throw RequestError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw RequestError(401, "Please verify your email");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
