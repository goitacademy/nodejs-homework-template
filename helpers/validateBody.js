import { HttpError } from './index.js';

const validateBody = contactAddShcema => {
  const func = (req, res, next) => {
    try {
      contactAddShcema.validate(req.body)
        ? next(
            HttpError(
              404,
              (error.message = `missing required ${error.details[0].path} field`)
            )
          )
        : next();
    } catch (error) {
      console.log('errorCTR', error);
      next(error);
    }
  };
  return func;
};
export default validateBody;
