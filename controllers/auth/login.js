const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { User } = require("../../models");
const { ctrlWrapper, HttpError } = require("../../helpers");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, {
      status: "error",
      code: 401,
      message: "Authorization data is invalid",
    });
  }
  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    throw HttpError(401, {
      status: "error",
      code: 401,
      message: "Authorization data is invalid",
    });
  }
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(user._id, { token });

  await res.status(200).json({
    status: "success",
    code: 200,
    data: {
      email: user.email,
      name: user.name,
      token,
    },
  });
};

module.exports = { login: ctrlWrapper(login) };
