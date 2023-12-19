
const { createUserDataValidator, updateUserDataValidator } = require("../utils/contactsValidator");


const checkCreateUserData =  (req, res, next) => {
    const { value, error } = createUserDataValidator(req.body);
    req.body = value;

    
  if (error) {
    const validationError = new Error('Some fields are missing!');
    validationError.status = 400;
    throw validationError;
  }

    next();
  };
  
 const checkUpdateUserData = (req, res, next) => {
    const { value, error } = updateUserDataValidator(req.body);
    req.body = value;

    
    if (error) {
        const validationError = new Error('Invalid data!');
        validationError.status = 400;
        throw validationError;
      }
    
  
    next();
  };
  

  module.exports = {
    checkCreateUserData,
    checkUpdateUserData
  }
  