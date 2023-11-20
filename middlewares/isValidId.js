import { isValidObjectId } from "mongoose";
import { HttpError } from "../helpers/index.js";

const isVallidId = (req, res, next) => {
  const { contactId } = req.params;
  console.log(contactId);
  if (!isValidObjectId(contactId)) {
    return next(HttpError(404, `${contactId} is not valid id`));
  }
  next();
};
export default isVallidId;
