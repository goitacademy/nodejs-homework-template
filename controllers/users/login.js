// const { userValidator } = require("../../utils/");
const { userValidator } = require("../../utils/validation/validator");
const userModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;


const login = async (req, res) => {
  const { error } = userValidator(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { email, password } = req.body;
  const user = await userModel.getUser({ email });

  if (!user || !user.validPassword(password) || !user.verify) {
    return res.status(401).json({
      status: "error",
      code: 401,
      message: "Incorrect email or password",
      data: "Unauthorized",
    });
  }

  const payload = {
    id: user.id,
    email: user.email,
  };

  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  user.setToken(token);
  await user.save();
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    },
  });
};

module.exports = { login };
