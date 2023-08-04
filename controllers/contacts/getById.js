import Contact from "../../models/contacts.js";

import { HttpError } from "../../helpers/index.js";

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, `Contact with ID ${contactId} not found`);
  }
  res.json(result);
};

export default getById;
