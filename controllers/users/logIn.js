const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const { createError } = require("../../helpers");
const { User, schemas } = require("../../models/user");
const { SECRET_KEY } = process.env;

const logIn = async (req, res, next) => {
  const { error } = schemas.login.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcryptjs.compare(password, user.password);
  if (!passwordCompare) {
    throw createError(401, "Email or password is wrong");
  }

  const payload = {
    id: user.id,
  };

  const token = jsonwebtoken.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: { email },
  });
};

module.exports = logIn;
