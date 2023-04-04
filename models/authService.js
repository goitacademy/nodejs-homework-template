const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuid } = require("uuid");



const { User } = require('../db/userModel');
const { NotAuthorizedError } = require('../helpers/errors');

const gravatar = require('gravatar');
const sendEmail= require('../helpers/sendEmail');


const registration = async (email, password) => {
  const avatarURL = gravatar.url(email);
  const verificationToken = uuid();

  const user = new User({
    email, password, avatarURL, verificationToken
  });
  
  await user.save();

  const mail = {
    to: email,
    subject: "Registration confirmation",
    html: `<a target="_blank"href=" href="http://local host:3000/api/users/verify/${verificationToken}>"Confirm your ${email}<a/>`
  };

  await sendEmail(mail);
  
};


const login = async (email, password) => {
  const user = await User.findOne({ email, verify:true });
  if (!user || !user.verify) {
    throw new NotAuthorizedError(`No user with such email or not verify`);
  }

  if (!await bcrypt.compare(password, user.password)) {
    throw new NotAuthorizedError(`Password is wrong`); 
  }

  const token = jwt.sign({
    _id: user.id
  }, process.env.JWT_SESCRET);

  return token;
};

const logout = async (_id) => {
  const user = await User.findByIdAndUpdate(_id, { token: null });
  if (!user) {
    throw new NotAuthorizedError(`No user with such email`);
  }
};

const currentUser = async (token) => {
const user = await User.findOne({ token });
  if (!user) {
    throw new NotAuthorizedError(`No user with such email`);
  }
}



module.exports = {
  registration,
  login,
  logout,
  currentUser
}
