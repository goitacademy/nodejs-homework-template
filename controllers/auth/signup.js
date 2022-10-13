// const { Conflict } = require("http-errors"); можна использовать если нет такой функции как RequestError
const gravatar = require("gravatar");
const { User } = require("../../models");
const { RequestError } = require("../../helpers");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  const { name, email, subscription, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);
  // если его еще нет то сохраняем в базе
  const result = await User.create({
    name,
    email,
    subscription,
    password: hashPassword,
    avatarURL,
  });

  // res.status(201).json(
  //   {
  //   email: result.email,
  //     name: result.name,
  //   }
  // )
  res.status(201).json({
    status: "Created",
    code: 201,
    user: {
      email: result.email,
      name: result.name,
      subscription: result.subscription,
      avatarURL: result.avatarURL,
    },
  });
};

module.exports = signup;
