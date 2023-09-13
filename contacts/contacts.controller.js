import {
  addContact,
  deleteContact,
  getAllContact,
  getContact,
  patchContact,
} from "./contacts.dao.js";

export const getAllContactsHandler = async (_, res) => {
  const contacts = await getAllContact();
  return res.json({ contacts });
};

export const getContactHandler = async (req, res) => {
  const contactId = req.params.id;
  const contact = await getContact(contactId);
  if (!contact) {
    return res.status(404).send();
  }
  res.json({ contact });
};

export const createContactHandler = async (req, res) => {
  const contactToCreate = req.body;
  if (!contactToCreate.email) {
    return res.status(400).send({ error: "Email jest wymagany" });
  }
  const createdContact = await addContact(contactToCreate);
  return res.status(201).json({ contact: createdContact });
};

export const updateContactHandler = async (req, res) => {
  const contactId = req.params.id;
  const contactToUpdate = req.body;
  const updatedContact = await patchContact(contactId, contactToUpdate);
  if (!updatedContact) {
    return res.status(404).send({ message: "Nie znaleziono kontaktu" });
  }
  res.status(200).json(updatedContact);
};

export const deleteContactHandler = async (req, res) => {
  const contactId = req.params.id;
  await deleteContact(contactId);
  return res.status(204).send();
};
