const bcrypt = require("bcrypt");
const User = require("../models/user");

const register = async (body) => {
  const currentUser = await User.findOne({ email: body.email });
  if (currentUser) {
    return res.status(409).json({ message: "User alredy exist" });
  }
  body.password = await bcrypt.hash(body.password, 10);

  await User.create(body);

  return res.status(201).end();
};

module.exports = { register };
