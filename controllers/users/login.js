const { User } = require("../../models/user");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized("Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "4h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
  //     if (!user) {
  //       throw new Unauthorized("Email or password is wrong");
  //     }
  //   const passCompare = bcrypt.compareSync(password, user.password);
  //   if (!passCompare) {
  //     throw new Unauthorized("Email or password is wrong");
  //   }
};

module.exports = login;
