import Contact from "../../models/contacts.js";

import { HttpError } from "../../helpers/index.js";

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Contact with ID ${contactId} not found`);
  }
  res.json(result);
};

export default updateById;
