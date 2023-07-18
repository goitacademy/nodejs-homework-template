const { joiRegisterSchema } = require("../../models/user");
const asyncHandler = require("express-async-handler");
const {
  registerNewUser,
  findUserByEmail,
} = require("../../services/authService");

const registerUser = asyncHandler(async (req, res) => {
  const { error } = joiRegisterSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const { email, password, subscription = "starter" } = req.body;
  const user = await findUserByEmail({ email });

  user
    ? res.status(409).json({ message: "Email in use" })
    : await registerNewUser({ email, password });

  res.status(201).json({
    user: {
      email,
      subscription,
    },
  });
});

module.exports = { registerUser };
