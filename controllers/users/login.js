const { User } = require("../../models");
const { Unauthorized } = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SHA256 } = require("crypto-js");

const { SECRET_KEY } = process.env;
const encryptedKey = SHA256(SECRET_KEY).toString();

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(user);
  const pwdCompare = bcrypt.compareSync(password, user.password);
  console.log(pwdCompare);
  if (!user || !pwdCompare) {
    throw new Unauthorized("Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, encryptedKey, { expiresIn: "1h" });

  res.json({
    status: "success",
    code: 200,
    data: {
      token,
    },
  });
};

module.exports = login;
