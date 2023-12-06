import { Contact } from "../../models/contact/contact.js";

import { HttpError } from "../../helpers/index.js";

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Contact deleted",
  });
};

export default removeContact;
