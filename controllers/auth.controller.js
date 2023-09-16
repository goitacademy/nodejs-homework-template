const HttpError = require("../helpers/HttpError");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.validPassword(password)) {
    return HttpError(400, "Incorrect login or password");
  }

  const payload = {
    id: user.id,
    username: user.username,
  };

  const secret = process.env.SECRET;
  const token = jwt.sign(payload, secret, { expiresIn: "23h" });
  return res.json({
    status: "success",
    code: 200,
    data: {
      token,
    },
  });
};

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).lean();

  if (user) {
    return HttpError(409, "Email is already in use");
  }
  try {
    const newUser = new User({ email });
    newUser.setPassword(password);
    await newUser.save();
    return res.status(201).json({
      status: "success",
      code: 201,
      data: {
        messsage: "Registration successful",
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  register,
};
