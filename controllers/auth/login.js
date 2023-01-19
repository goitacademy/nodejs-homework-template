const { User } = require("../../models/user");
const { Unauthorized } = require("http-errors");
const bcript = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const passCompare = bcript.compareSync(password, user.password);
  if (!user || !passCompare) {
    throw new Unauthorized("Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, `${process.env.SECRET_KAY}`, {
    expiresIn: "1h",
  });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    status: "success",
    code: 200,
    data: {
      token,
    },
  });
};

module.exports = login;
