const bcrypt = require("bcryptjs");
const {User}=require('../../models/user')
const {HttpErrors}=require('../../helpers')
const register = async (req, res, next) => {
  const { password, email } = req.body;
  const user=await User.findOne({email}).exec()
  if(user){
    throw HttpErrors(409, 'Email in use')
  }
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  const newUser=await User.create({...req.body, password:hashPassword})
  await res.status(201).json({
    status:'success',
    code:201,
    user:{
      email: newUser.email,
      subscription: newUser.subscription
    }
  })
};

module.exports = register;
