const { User } = require("../../db/userModel");
const bcrypt = require("bcrypt");

const registerUserService = async (email, password) => {
  const contact = new User({
    email,
    password: await bcrypt.hash(password, 10),
  });
  await contact.save();

  return contact;
};
module.exports = { registerUserService };
