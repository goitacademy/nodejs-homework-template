const { User } = require("./auth.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getConfig } = require("../../config");
const { Conflict, Unauthorized } = require("http-errors");

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(5);
  return bcrypt.hash(password, salt);
};

const generateToken = (userId) => {
  const { jwt: jwtConfig } = getConfig();
  return jwt.sign({ userId }, jwtConfig.secret, {expiresIn: "1h" });
};




const singUp = async (userParams) => {
  const { email, password, subscription } = await userParams;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Conflict(`User with ${email} already exists`);
  }
  return User.create({
    email,
    subscription,
    passwordHash: await hashPassword(password),
  });
};

const singIn = async (singIpParams) => {
  const { email, password } = await singIpParams;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthorized(`Email or password is wrong`);
  }
  const userPassword = bcrypt.compareSync(password, user.passwordHash);
  if (!userPassword) {
    throw new Unauthorized(`Email or password is wrong`);
  }
  const token = generateToken(user._id);

  await User.findByIdAndUpdate(user, { token })
  return { user, token };
};

const deleteToken = (req) => {
  const { _id } = req.userId;
   User.findByIdAndUpdate(_id,{token:null});
};


module.exports = { singUp, singIn,  deleteToken };
