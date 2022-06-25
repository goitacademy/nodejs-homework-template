const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const createError = require("../helpers/createError");
const createResponse = require("../helpers/createResponse");
const { userSchema } = require("../validation/schema");
const { SECRET_KEY } = process.env;

async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    const { error } = userSchema.validate(req.body);
    if (error) throw createError(400, error.message);

    const user = await User.findOne({ email });
    if (!user) {
      throw createError(401, "Email or password is wrong");
    }

    const passCompare = bcrypt.compareSync(password, user.password);

    if (!passCompare) {
      throw createError(401, "Email or password is wrong");
    }

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await User.findByIdAndUpdate(user._id, { token });
    createResponse(201, res, { token: token });
  } catch (error) {
    next(error);
  }
}

module.exports = login;
