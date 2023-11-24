// controllers/contact/postAddContact.js
import Contact from "../../models/Contact.js";

export const postAddContact = async (req, res) => {
  const data = await Contact.create(req.body);
  res.status(201).json(data);
};
