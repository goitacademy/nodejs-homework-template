const { User } = require("../../models");
const createError = require("http-errors");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.comparePassword(password)) {
    throw createError(401, `Email or password is wrong. Unauthorized`);
  }

  // if (!user) {
  //   throw createError(401, `Email or password is wrong. Unauthorized`);
  // }
  // const passCompare = bcrypt.compareSync(password, user.password);
  // if (!passCompare) {
  //   throw createError(401, `Email or password is wrong. Unauthorized`);
  // }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  res.json({
    status: "success",
    code: 200,
    data: {
      token,
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = login;
