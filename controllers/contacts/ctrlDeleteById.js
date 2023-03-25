import { Contact } from "../../schemas/contacts.js";

import { ctrlWrapper } from "../../helpers/ctrlWrapper.js";
import { HttpError } from "../../helpers/HttpError.js";

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result?.length) {
      return next(HttpError(404, "Not found"));
    }
    res.json("Contact deleted");
  } catch (error) {
    next(error);
  }
};

const ctrlDeleteById = ctrlWrapper(deleteById);
 export default ctrlDeleteById;