const User = require("../../models/usersSchema.js");
const { joiRegister} = require("../../utils/joiValidation.js");
const requestError = require("../../utils/requestError.js");
const bcrypt = require('bcryptjs');

const userLogin = async (req, res, next) => {
    const {email, password} = req.body;

    const validationError = joiRegister({ email, password });

  if (validationError) {
    const error = requestError(400, validationError.message);
    throw error;
  }

  const userExist = await User.find({ email });

  if (userExist.length === 0) {
    const errorUserExist = requestError(401, "Email or password is wrong" );
    throw errorUserExist;
  }
  console.log(userExist);

  const hashedPassword = userExist[0].password;
  
  const isTruePassword = await bcrypt.compare(password, hashedPassword);
  
  if(isTruePassword){
    
  }

  res.status(200).json({message: "ok"});
}

//   

module.exports = userLogin;