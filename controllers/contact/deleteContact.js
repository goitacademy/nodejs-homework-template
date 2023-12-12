
import Contact from "../../models/contacts.js";
import { HttpError } from "../../helpers/index.js";

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const data = await Contact.findByIdAndDelete(id);

  if (!data) {
    throw HttpError(404);
  }

  res.status(200).json({ message: "contact deleted" });
};
