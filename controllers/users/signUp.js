const bcryptjs = require("bcryptjs");
const { createError } = require("../../helpers");
const { User, schemas } = require("../../models/user");

const signUp = async (req, res, next) => {
  const { error } = schemas.users.validate(req.body);
  if (error) {
    throw createError(400, "Invalid email or password");
  }
  const { email, password } = req.body;
  const result = await User.findOne({ email });
  if (result) {
    throw createError(409, "Email in use");
  }
  const hashPassword = await bcryptjs.hash(password, 10);

  await User.create({ email, password: hashPassword });
  res.status(201).json({
    user: { email },
  });
};

module.exports = signUp;
