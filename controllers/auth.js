const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const { SECRET_KEY } = process.env;

const signup = async (req, res) => {
  const { name, email, password, subscription } = req.body;
  const checkUser = await User.findOne({ email });
  if (checkUser) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email in use",
    });
  } else {
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      subscription,
    });
    return res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: {
          name: user.name,
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({
      status: "error",
      code: 401,
      message: "Email or password is wrong",
    });
  } else {
    const token = jwt.sign(
      {
        id: user._id,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    await User.findByIdAndUpdate(user._id, { token });
    return res.json({ status: "success", code: 200, data: { token } });
  }
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  return res.status(204).json({ status: "success", code: 204 });
};

module.exports = {
  signup,
  login,
  logout,
};
