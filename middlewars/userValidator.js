import HttpError from "../helpers/HttpError.js";
import userSchema from "../schemas/userSchema.js";

const userRegisterValidator = (req, res, next) => {
  const { error } = userSchema.userSignupSchema.validate(req.body);
   if (error) {
      if (error.details[0].type === "any.required") {
        throw HttpError(400, `missing required ${error.details[0].path[0]} field`); 
      } else if (error.details[0].type.includes('base')) {
        throw HttpError(400, error.message); 
      }
  }
  next();
}  

const userLoginValidator = (req, res, next) => {
   const { error } = userSchema.userSigninSchema.validate(req.body);
   if (error) {
      if (error.details[0].type === "any.required") {
        throw HttpError(400, `missing required ${error.details[0].path[0]} field`); 
      } else if (error.details[0].type.includes('base')) {
        throw HttpError(400, error.message); 
      }
  }
  next();
}

export default {
  userRegisterValidator,
  userLoginValidator
};