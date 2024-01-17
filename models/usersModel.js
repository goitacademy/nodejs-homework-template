const User = require("../schemas/mongooseSchemas/userSchema");
const bcrypt = require("bcrypt");

const registerUser = async (email, password) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();

  return {
    email: newUser.email,
    subscription: newUser.subscription,
  };
};

module.exports = { registerUser };
