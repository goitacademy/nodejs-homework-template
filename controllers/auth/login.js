const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { middlewareForLogin } = require("../../middlewares/usermiddlewares");
const { User } = require("../../models/user");

const { SECRET_KEY } = process.env;

async function login(req, res) {
  middlewareForLogin(req, res);
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const passCompare = bcrypt.compareSync(password, user.password);
  if (!user || !passCompare) {
    throw new Unauthorized("Email or password is wrong");
  }

  const payload = {
    _id: user.id,
  };

  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    status: "success",
    code: 200,
    data: {
      token,
    },
  });
}

module.exports = login;
