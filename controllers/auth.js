const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, schemas } = require("../models/user");
const { HttpError, ctrlWrapper } = require("../helpers/index");
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { error } = schemas.registerSchema.validate(req.body);

  if (error) {
    throw HttpError(400, "missing required name field");
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) throw HttpError(409, "Email already in use");

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    email: newUser.email,
  });
};

const login = async (req, res) => {
  const { error } = schemas.loginSchema.validate(req.body);

  if (error) {
    throw HttpError(400, "missing required name field");
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw HttpError(401, "Email or password invalid");

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw HttpError(401, "Email or password invalid");

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  res.json({ token });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
};
