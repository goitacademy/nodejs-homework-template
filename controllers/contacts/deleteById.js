import Contact from "../../models/contacts.js";

import { HttpError } from "../../helpers/index.js";

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, `Contact with ID ${contactId} not found`);
  }
  res.json({
    message: "Delete success",
  });
};

export default deleteById;
