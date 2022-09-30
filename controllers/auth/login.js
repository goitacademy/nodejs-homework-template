const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { authServices } = require("../../services");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.getByEmail({ email });
  const passCompare = user ? bcrypt.compareSync(password, user.password) : null;
  if (!user || !passCompare)
    throw createError(401, "Email or password is wrong");
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
  await authServices.login(user.id, token);
  res.status(200).json({
    status: "success",
    code: "200",
    payload: {
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    },
  });
};

module.exports = login;
