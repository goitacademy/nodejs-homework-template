const User = require("../models/user");
const { HttpError } = require("../helpers");
const { ctrlWraper } = require("../helpers");

const register = async (req, res) => {
  const newUser = await User.create(req.body);

  res.json({
    email: newUser.email,
    subscription: "starter",
  });
};

module.exports = {
  register: ctrlWraper(register),
};

// Status: 201 Created
// Content-Type: application/json
// ResponseBody: {
//   "user": {
//
//
//   }
// }
