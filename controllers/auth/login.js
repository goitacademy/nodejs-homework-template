const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { authServices } = require("../../services");
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.getByEmail({ email });
  const passCompare = user ? bcrypt.compareSync(password, user.password) : null;
  if (!user || !passCompare)
    throw createError(401, "Email or password is wrong");
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
  res.status(201).json({
    status: "success",
    data: {
      token,
    },
  });
};

module.exports = register;
