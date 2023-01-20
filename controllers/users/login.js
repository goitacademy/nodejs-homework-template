const { User } = require("../../models/user");
const bcrypt = require("bcryptjs");
// webtoken
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(401).json({ message: "Email or password is wrong" }); // "Email invalid"
    return;
  }

  if (!user.verify) {
    res.status(403).json({ message: "Email is not verified" }); // "Email is not verified"
    return;
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    res.status(401).json({ message: "Email or password is wrong" }); // "Password invalid"
    return;
  }
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "20h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token: token,
    user: {
      email: email,
      subscription: "starter",
    },
  });
};

module.exports = login;
