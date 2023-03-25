import { Contact } from "../../schemas/contacts.js";

import { ctrlWrapper } from "../../helpers/ctrlWrapper.js";
import { HttpError } from "../../helpers/HttpError.js";
const updateFavoriteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      return res.status(404).send("Contact not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const ctrlUpdateFavorite = ctrlWrapper(updateFavoriteContact);
 export default ctrlUpdateFavorite;