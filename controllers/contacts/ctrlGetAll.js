import { Contact } from "../../schemas/contacts.js";

import { ctrlWrapper } from "../../helpers/ctrlWrapper.js";
import { HttpError } from "../../helpers/HttpError.js";
const getAll = async (_, res, next) => {
  try {
    const result = await Contact.find({}, "-createdAt -updatedAt");
    if (!result.length) {
      return res.status(404).send("No contacts found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
const ctrlGetAll = ctrlWrapper(getAll);
export default ctrlGetAll