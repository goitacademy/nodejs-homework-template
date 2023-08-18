const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const service = require("../../model/users");
const { catchAsync, AppError } = require("../../utils/errorHandlers");

require("dotenv").config({
  path:
    process.env.NODE_ENV === "production"
      ? "./environments/production.env"
      : "./environments/development.env",
});

const { SECRET_KEY } = process.env;

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await service.findUserByEmail(email);

  if (!user) throw new AppError(401, "email or password is invalid");

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw new AppError(401, "email or password is invalid");

  const payload = { id: user.id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await service.updateToken(user._id, token);

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
});

module.exports = login;
