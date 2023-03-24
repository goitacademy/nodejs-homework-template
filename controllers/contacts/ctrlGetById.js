import { Contact } from "../../schemas/contacts.js";

import { ctrlWrapper } from "../../helpers/ctrlWrapper.js";
import { HttpError } from "../../helpers/HttpError.js";

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result?.length) {
      return next(HttpError(404, "Not found"));
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const ctrlGetById = ctrlWrapper(getById);
export default ctrlGetById;