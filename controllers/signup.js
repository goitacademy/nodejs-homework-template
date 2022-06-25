const bcrypt = require("bcrypt");
const User = require("../models/user");
const createError = require("../helpers/createError");
const createUserResponse = require("../helpers/createResponse");
const { userSchema } = require("../validation/schema");

async function signup(req, res, next) {
  const { email, password } = req.body;
  try {
    const { error } = userSchema.validate(req.body);
    if (error) throw createError(400, error.message);

    const user = await User.findOne({ email });
    if (user) throw createError(409, "Email in use");

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const result = await User.create({ email, password: hashPassword });
    createUserResponse(201, res, { user: result });
  } catch (error) {
    next(error);
  }
}

module.exports = signup;
