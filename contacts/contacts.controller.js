import {
  addContact,
  deleteContact,
  getAllContact,
  getContact,
  patchContact,
} from "./contacts.dao.js";

export const getContactHandler = async (req, res) => {
  const contactId = req.params.id;
  const contact = await getContact(contactId);
  if (!contact) {
    res.status(404).send();
  }
  return res.json({ contact });
};
