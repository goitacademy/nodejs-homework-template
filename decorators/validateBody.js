import { HttpError } from "../helpers/index.js";

const validateBody = () => {
  return (req, res, next) => {
    const { error } = contactsAddSchema.validate(req.body);
    if (error) next(HttpError(400, error.message));
    next();
  };
};

export default validateBody;
