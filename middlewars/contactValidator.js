import HttpError from "../helpers/HttpError.js";
import contactsSchema from "../schemas/contactsSchema.js";

const contactValidator = (req, res, next) => {
  const { error } = contactsSchema.validate(req.body);
   if (error) {
      if (error.details[0].type === "any.required") {
        throw HttpError(400, `missing required ${error.details[0].path[0]} field`); 
      } else if (error.details[0].type.includes('base')) {
        throw HttpError(400, error.message); 
      }
  }
  next();
}  

export default contactValidator;