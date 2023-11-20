import { addContact } from "../../repositories/contacts/addContact";

export async function createContacts(req, res, next) {
  try {
    const { error } = postContactSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
    } else {
      const newContact = await addContact(req.body);
      res.status(201).json(newContact);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
