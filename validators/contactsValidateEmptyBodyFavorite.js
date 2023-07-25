import HttpError from "../helpers/HttpError.js";

const emptyBodyFavoriteValidator = (req, res, next) => {
    const keys = Object.keys(req.body);
     if (keys.length === 0) {
         console.log("body empty")
         throw HttpError(400, `missing favorite field`); 
    }
    next();
}
export default emptyBodyFavoriteValidator;