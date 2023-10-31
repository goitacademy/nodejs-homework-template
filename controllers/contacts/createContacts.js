import Contact from "../../models/contactModel.js";

export async function createContacts(req, res, next) {
  const { name, email, phone } = req.body;

  try {
    const newContact = new Contact({ name, email, phone });
    const savedContact = await newContact.save();
    return res.status(201).json(savedContact);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
