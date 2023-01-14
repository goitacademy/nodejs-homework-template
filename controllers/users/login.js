const { User, HttpError } = require("../../models");
const { compareSync } = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = toString(process.env.SECRET_KEY);

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const passCompare = compareSync(password, user.password);

  if (!user || !passCompare) {
    return next(new HttpError(401, "Email or password is wrong"));
  }

  const payload = { id: user.owner };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  res.status(200).json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
};

module.exports = login;
