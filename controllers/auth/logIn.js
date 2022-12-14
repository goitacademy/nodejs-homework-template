const { User } = require("../../models/user");
const { Unauthorized } = require("http-errors");
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

async function logIn(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized("Email or password is wrong");
  }
  //   if (!user) {
  //     throw new Unauthorized();
  //   }
  //   const passwordCompare = bcrypt.compareSync(password, user.password);
  //   if (!passwordCompare) {
  //     throw new Unauthorized("Email or password is wrong");
  //   }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    status: "success",
    code: 200,
    data: {
      token,
    },
  });
}

module.exports = logIn;
