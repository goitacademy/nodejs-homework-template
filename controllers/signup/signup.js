const { User } = require("../../models");
const createError = require("http-errors");
// const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const { email, password, subscription = "starter" } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, `Email ${email} in use. Conflict`);
  }

  const newUser = new User({ email, password, subscription });
  newUser.setPassword(password);
  newUser.save();

  // const hashhPasswordd = bcrypt.hashSync(password, bcrypt.genSaltSync(10));+
  // const hashPassword1 = bcrypt.compareSync(password, hashhPasswordd); /true

  // const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  // const result = await User.create({
  //   email,
  //   password: hashPassword,
  //   subscription,
  // });

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      // result,
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = signup;
