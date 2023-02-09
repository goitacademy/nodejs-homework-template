const { User } = require("../utils/schemas/schemaUser");
const { HttpError } = require("../utils/helpers/httpError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function register(req, res, next) {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const savedUser = await User.create({
      email,
      password: hashedPassword,
    });
    res.status(201).json(savedUser);
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      throw new HttpError(409, "User with this email already exists");
    }
    throw error;
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;
  const storedUser = await User.findOne({
    email,
  });

  if (!storedUser) {
    throw HttpError(401, "Email or password is wrong");
  }

  const isPasswordValid = await bcrypt.compare(password, storedUser.password);

  if (!isPasswordValid) {
    throw HttpError(401, "password is not valid");
  }

  const token = jwt.sign({ id: storedUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  await User.findByIdAndUpdate(storedUser._id, { token });

  res.json({
    token,
    user: {
      email,
      subscription: storedUser.subscription,
    },
  });
}

module.exports = {
  register,
  login,
};
