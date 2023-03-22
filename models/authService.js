const { User } = require('../db/userModel');
// const { NotAuthorizedError } = require('../helpers/errors');
const bcrypt = require('bcryptjs');


const registration = async (email, password) => {
     
  const user = new User({
        email, password: await bcrypt.hash(password,10)
    });
    await user.save();
};



const login = async (req, res) => {
  
  res.json({ status: 'success' });
};



module.exports = {
  registration,
  login,
}
