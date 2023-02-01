const {Unauthorized} = require("http-errors");
const { User } = require("../../models");

const login = async (req, res, next)=> {
try {
  const {email, password}= req.body;
  const user = await User.findOne({email});
  
  if(user || user.comparePassword(password)){
    throw new Unauthorized("Email or password is wrong");
  }
} catch (error) {
  next(error)
}
}


module.exports = login;