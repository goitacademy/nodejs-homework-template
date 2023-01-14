const { User, HttpError } = require("../../models");
const { compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

// const SECRET_KEY = "HKJH56u74ihgnae6";
// console.log(SECRET_KEY);

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const passCompare = compareSync(password, user.password);
  if (!user || !passCompare) {
    return next(new HttpError(401, "Email or password is wrong"));
  }
  const payload = { id: user._id };
  console.log(user._id);
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  res.status(200).json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
};

module.exports = login;
