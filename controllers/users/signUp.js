const { User } = require("../../models");
const bcrypt = require("bcryptjs");

const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  const alreadyInDB = await User.findOne({ email });

  if (alreadyInDB) {
    const error = new Error("Email in use");
    error.status = 409;
    throw error;
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  await User.create({ name, email, password: hashedPassword });
  res.status(201).json({
    status: 201,
    user: {
      email,
      subscription: "starter",
    },
  });
};

module.exports = signUp;
