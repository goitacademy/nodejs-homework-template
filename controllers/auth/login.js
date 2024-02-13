const User = require("../../models/users");
const userSchema = require("./validationSchema.js");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  console.log("login");
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { email, password } = req.body;
  console.log(password);

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log(user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Email or password is not valid" });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  user.token = token;
  await user.save();

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
