import { HttpError } from "../helpers/index.js";

const idNotFound = (data) => {
  const func = async (req, res, next) => {
    const { contactId } = req.params;
    const result = data.findIndex((item) => item.id === String(contactId));
    if (result === -1) {
      return next(
        HttpError(404, `Contact with id: "${contactId}" doesn't exists`)
      );
    }
    next();
  };
  return func;
};

export default idNotFound;
