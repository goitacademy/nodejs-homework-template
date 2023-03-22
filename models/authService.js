const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../db/userModel');
const { NotAuthorizedError } = require('../helpers/errors');



const registration = async (email, password) => {
     
  const user = new User({
        email, password
    });
    await user.save();
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



module.exports = {
  registration,
  login,
}
