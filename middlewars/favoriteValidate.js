import HttpError from "../helpers/HttpError.js";
import favoriteSchema from "../schemas/contactsFavoriteSchema.js";

const favoriteValidate = (req, res, next) => {
  const { error } = favoriteSchema.validate(req.body);
   if (error) {
      
       if (error.details[0].type.includes('base')) {
        throw HttpError(400, error.message); 
      }
  }
  next();
}  

export default favoriteValidate;