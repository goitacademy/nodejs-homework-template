const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const { User } = require('../db/userModel');
const { NotAuthorizedError } = require('../helpers/errors');

const gravatar = require('gravatar');



const registration = async (email, password) => {
  const avatarURL = gravatar.url(email);   
  const user = new User({
        email, password, avatarURL
  });
  
  await user.save();
  
  const msg = {
    to: email,
    from: 'mirzakhanovamari@gmail.com',
    subject: 'Thank You for registration',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
    await sgMail.send(msg);
};



const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotAuthorizedError(`No user with such email`);
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
