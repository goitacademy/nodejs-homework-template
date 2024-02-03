const User = require("../../models/users");

const registration = async (req, res, next) => {
  const result = await User.create(req.body);
  //   console.log("registration");

  res.status(201).json(result);
};

module.exports = registration;
