import { Contact } from "../../schemas/contacts.js";

import { ctrlWrapper } from "../../helpers/ctrlWrapper.js";
import { HttpError } from "../../helpers/HttpError.js";



const add = async (req, res, next) => {
  try {
    const result = await Contact.create(req.body);
    if (!result?.id) {
      return next(HttpError(400, "Bad request"));
    }
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
const ctrlAdd = ctrlWrapper(add);
export default ctrlAdd;
