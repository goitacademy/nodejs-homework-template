const { User } = require("../db/userModel");

const registrationUser = async (email, password) => {
  console.log(email, password);

  const user = new User({ email, password });
  await user.save();
};

module.exports = { registrationUser };
