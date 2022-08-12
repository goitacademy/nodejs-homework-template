const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const sha256 = require("sha256");
const sgMail = require("@sendgrid/mail");

const { User } = require("../db/userModel");
const { NotAuthorizedError } = require("../Helpers/errors");
const { updateToken } = require("./usersService");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const signup = async (email, password) => {
  const avatarURL = gravatar.url(email, { s: "500" });
  const verificationToken = sha256(email + process.env.JWT_SECRET);
  const user = new User({ email, password, avatarURL, verificationToken });
  if (user) await user.save();

  const msg = {
    to: email,
    from: "tsukotaed@gmail.com",
    subject: "Thank you for registration!",
    text: `Please confirm your email address GET  http://localhost:8080/api/users/verify/${verificationToken}`,
    html: `Please confirm your email address GET  http://localhost:8080/api/users/verify/${verificationToken}`,
  };
  await sgMail.send(msg);
  return user;
};

const login = async (email, password) => {
  const user = await User.findOne({ email, verify: true });
  if (!user) {
    throw new NotAuthorizedError(`No user with email: '${email}' found`);
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError(`Wrong password`);
  }

  const token = jwt.sign(
    {
      _id: user._id,
      createdAt: user.createdAt,
    },
    process.env.JWT_SECRET
  );
  const updateUser = await User.findOne({ _id: user._id });
  const data = await updateToken(user._id, token);
  return token, data;
};

const logout = async (userId) => {
  if (!userId) {
    throw new NotAuthorizedError("Not authorized. You need to be logged in!");
  }

  const user = await User.findOne({ _id: userId });
  const data = await updateToken(userId, null);
  return user;
};
module.exports = {
  signup,
  login,
  logout,
};
