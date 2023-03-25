import { Contact } from "../../schemas/contacts.js";

import { ctrlWrapper } from "../../helpers/ctrlWrapper.js";
import { HttpError } from "../../helpers/HttpError.js";


const updateById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      return next(HttpError(404, "Not found"));
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const ctrlUpdateById = ctrlWrapper(updateById);
 export default ctrlUpdateById;