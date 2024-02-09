const User = require("../../models/users");
const userSchema = require("./validationSchema");
const bcrypt = require("bcryptjs");

const regControllerWrapper = require("./regControllerWrapper");

const login = async (req, res, next) => {
  // try {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Email or password is not valid" });
  }

  // const token = jwt.sign({ userId: user._id }, "your_secret_key", {
  //   expiresIn: "1h",
  // });
  res.status(200).json({
    token: "TOKEN",
    // user: { email: user.email, subscription: user.subscription },
  });
  // } catch (error) {
  //   handleErrors(res, error);
  // }
};

module.exports = login;
