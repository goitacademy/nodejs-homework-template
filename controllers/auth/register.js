const { User } = require("../../models");
const { ctrlWrapper, HttpError } = require("../../helpers");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(400, {
      status: "error",
      code: 400,
      message: "Email already exist",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      email: newUser.email,
      name: newUser.name,
    },
  });
};

module.exports = { register: ctrlWrapper(register) };
