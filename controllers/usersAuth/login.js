const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User, schemas } = require("../../models/user");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { error } = schemas.login.validate(req.body);
  if (error) {
    res.status(400).json({ message: "Incorrect format of entered data" });
    return;
  }
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ message: "Incorrect email or password" });
    return;
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    res.status(401).json({ message: "Incorrect email or password" });
    return;
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email,
      subscription,
    },
  });
};

module.exports = login;
