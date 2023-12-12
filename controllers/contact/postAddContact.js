
import Contact from "../../models/contacts.js";

export const postAddContact = async (req, res) => {
  const data = await Contact.create(req.body);
  res.status(201).json(data);
};
