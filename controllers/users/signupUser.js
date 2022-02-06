const createError = require("http-errors");

const { User } = require("../../models");
const createToken = require("../../tokenService/createToken");

const signupUser = async (req, res, next) => {
  const { name, email, password, subscription } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw createError(409, "`Email in use`");
  }

  const newUser = await new User({ name, email, subscription });
  await newUser.setPassword(password);
  await newUser.save();

  const token = await createToken(newUser._id);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        name: newUser.name,
        email: newUser.email,
        subscription: newUser.subscription,
      },
      token,
    },
  });
};

module.exports = signupUser;
