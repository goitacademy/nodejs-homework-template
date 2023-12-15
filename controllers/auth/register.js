const { User } = require("../../models");
const { HttpError } = require("../../helpers");

const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });

  if (user) throw HttpError(409, `Email ${email} is already in use`);

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    code: 201,
    status: "User added",
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = register;
