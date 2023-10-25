const User = require("../../models/usersSchema.js");
const { joiRegister } = require("../../utils/joiValidation.js");
const requestError = require("../../utils/requestError.js");
const bcrypt = require('bcryptjs');

const userRegister = async (req, res, next) => {
  const { email, password } = req.body;

  const validationError = joiRegister({ email, password });

  if (validationError) {
    const error = requestError(400, validationError.message);
    throw error;
  }
  
  const userExist = await User.find({ email });
  if (userExist.length) {

    const errorUserExist = requestError(409, "Email in use" );

    throw errorUserExist;
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  
  const result = await User.create({
    email, 
    "password": hashedPassword
    });
  
  res.json({
    status: "created",
    code: 201,
    user: {
        "email": result.email,
        "subscription": result.subscription
    }
  });

};

module.exports = userRegister;
