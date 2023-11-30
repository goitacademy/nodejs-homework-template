// controllers/contact/updateContact.js
import Contact from "../../models/contacts.js";
import { HttpError } from "../../helpers/index.js";

export const updateContact = async (req, res) => {
  const { id } = req.params;

  const data = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  if (!data) {
    throw HttpError(404);
  }

  res.json(data);
};
