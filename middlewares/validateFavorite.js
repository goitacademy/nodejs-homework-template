import { HttpError } from '../helpers/index.js';
const validateFavotite = updateFavoriteShema => {
  const func = (req, res, next) => {
    const { error } = updateFavoriteShema.validate(req.body);
    if (error) {
      return next(
        HttpError(404, `missing required ${error.details[0].path} field`)
      );
    }
    next();
  };
  return func;
};
export default validateFavotite;
