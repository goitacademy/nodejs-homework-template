// const User = require("../service/schema/user");
const jwt = require("jsonwebtoken");
const { getUserByEmail } = require("../service/user");
require("dotenv").config();
const secret = process.env.SECRET;

const loginCtrl = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);

  if (!user || !user.validPassword(password)) {
    return res.status(400).json({
      status: "Error",
      code: 400,
      message: "Incorrect Login or Password",
      data: "Bad Request",
    });
  }
  if (!user.verify) {
    return res.status(401).json({
      status: "Error",
      code: 401,
      message: "Email not verified",
      data: "Unauthorized",
    });
  }
  const payload = {
    id: user.id,
    username: user.username,
  };

  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  res.json({
    status: "Success",
    code: 200,
    data: {
      token,
    },
  });
};

module.exports = loginCtrl;
