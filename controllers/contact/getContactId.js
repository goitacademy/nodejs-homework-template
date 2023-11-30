// controllers/contact/getContactId.js
import Contact from "../../models/contacts.js";
import { HttpError } from "../../helpers/index.js";

export const getContactId = async (req, res) => {
  const { id } = req.params;
  const data = await Contact.findById(id);
  if (!data) {
    throw HttpError(404);
  }
  res.json(data);
};
