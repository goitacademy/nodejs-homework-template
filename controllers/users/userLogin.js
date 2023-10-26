const User = require("../../models/usersSchema.js");
const { joiRegister} = require("../../utils/joiValidation.js");
const requestError = require("../../utils/requestError.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userLogin = async (req, res, next) => {
    const {email, password } = req.body;
    
    const validationError = joiRegister({ email, password });

  if (validationError) {
    const error = requestError(400, validationError.message);
    throw error;
  }

  const userExist = await User.findOne({ email });
  
  if (!userExist) {
    const errorUserExist = requestError(401, "Email(!) or password is wrong" );
    throw errorUserExist;
  }

  const {_id: user_id, password: hashedPassword, subscription} = userExist;

  const isTruePassword = await bcrypt.compare(password, hashedPassword);

  if(isTruePassword){
    
    const payload = {user_id};
    const {JWT_SECRET} = process.env; 
    
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '7d'} )

    await User.findOneAndUpdate({_id: user_id}, {token});

    res.status(200).json({token, user: {email, subscription}});

  } else {
    const errorUserExist = requestError(401, "Email or password(!) is wrong" );
    throw errorUserExist;
  }

}

module.exports = userLogin;