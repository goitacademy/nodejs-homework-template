import { Contact } from "../../models/contact/contact.js";

import { HttpError } from "../../helpers/index.js";

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

export default getContactById;
