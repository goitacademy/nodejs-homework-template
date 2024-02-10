// const User = require("../../models/users");
// const userSchema = require("../auth/validationSchema.js");

const currentUser = async (req, res, next) => {
  const { user } = req;

  if (!user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  res.status(200).json({
    email: user.email,
    subscription: user.subscription,
  });
};

module.exports = currentUser;
