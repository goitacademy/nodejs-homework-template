const { User } = require("../utils/schemas/schemaUser");
const { HttpError } = require("../utils/helpers/httpError");

async function register(req, res, next) {
  const { email, password } = req.body;
  // const { error } = schema.validate(req.body);
  try {
    const savedUser = await User.create({
      email,
      password,
    });
    res.status(201).json(savedUser);
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      throw new HttpError(409, "User with this email already exists");
    }
    throw error;
  }
}

module.exports = {
  register,
};
