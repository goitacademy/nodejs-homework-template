const User = require("../../models/users");
const bcrypt = require("bcryptjs");

const registration = async (req, res, next) => {
  const { error } = User.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "Email in use" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    password: hashedPassword,
    subscription: "starter",
  });

  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });

  return await newUser;
};

module.exports = registration;
