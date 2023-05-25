const bcrypt = require("bcrypt");
const { User } = require("../models/user");
// const { HttpError } = require("../helper/HttpError");

const register = async (body, res) => {
  const currentUser = await User.findOne({ email: body.email });
  if (currentUser) {
    // throw new HttpError(409, "User alredy exist");
    return res.status(409).json({ message: "User alredy exist" });
  }
  body.password = await bcrypt.hash(body.password, 10);

  return await User.create(body);

  //   return res.status(201).end();
};

module.exports = { register };
