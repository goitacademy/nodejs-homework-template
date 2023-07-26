import HttpError from "../helpers/HttpError.js";
// import contactsSchema from "./contactsValidateSchema.js";
import favoriteValid from "./contactsFavoriteValidateSchema.js";

const favoriteValidate = (req, res, next) => {
  const { error } = favoriteValid.validate(req.body);
   if (error) {
      
       if (error.details[0].type.includes('base')) {
        throw HttpError(400, error.message); 
      }
  }
  next();
}  

export default favoriteValidate;