const { joiRegisterSchema } = require("../../models/user");
const asyncHandler = require("express-async-handler");
const {
  findUserByEmail,
  createToken,
  loginUser,
} = require("../../services/authService");

const logInUser = asyncHandler(async (req, res) => {
  const { error } = joiRegisterSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const { email, password } = req.body;
  const user = await findUserByEmail({ email });

  if (!user || !user.comparePassword(password)) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  const token = await createToken(user);
  await loginUser(user._id, token);

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
});

module.exports = {
  logInUser,
};
