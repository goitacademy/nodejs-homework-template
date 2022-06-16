const { User } = require("../../models");
const bcrypt = require("bcryptjs");

const signIn = async (req, res) => {
  const { email, password } = req.body;

  const alreadyInDB = await User.findOne({ email });
  const authorized = bcrypt.compareSync(password, alreadyInDB.password);
  if (!alreadyInDB || !authorized) {
    const error = new Error("Email or password is wrong");
    error.status = 401;
    throw error;
  }
};

module.exports = signIn;
