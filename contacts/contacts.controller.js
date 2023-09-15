import {
  addContact,
  deleteContact,
  getAllContact,
  getContact,
  patchContact,
  updateStatusContact,
  addContacts,
} from "./contacts.dao.js";

export const getAllContactsHandler = async (req, res, next) => {
  try {
    const contacts = await getAllContact();
    return res.json({ contacts });
  } catch (error) {
    console.error("An error occurred while retrieving contacts:", error);
    next(error);
  }
};

export const getContactHandler = async (req, res) => {
  const contactId = req.params.id;
  const contact = await getContact(contactId);
  if (!contact) {
    return res.status(404).send();
  }
  res.json({ contact });
};

export const createContactsHandler = async (req, res) => {
  const contactsToCreate = Array.isArray(req.body) ? req.body : [req.body];

  // Sprawdzanie, czy każdy kontakt ma wymagany email
  for (const contact of contactsToCreate) {
    if (!contact.email) {
      return res
        .status(400)
        .send({ error: "Email jest wymagany dla każdego kontaktu" });
    }
  }

  try {
    const createdContacts = await addContacts(contactsToCreate); // Zakładam, że masz funkcję addContacts, która dodaje wiele kontaktów na raz
    return res.status(201).json({ contacts: createdContacts });
  } catch (error) {
    console.error("Wystąpił błąd podczas dodawania kontaktów:", error);
    return res
      .status(500)
      .send({ error: "Wystąpił błąd podczas dodawania kontaktów" });
  }
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

export const updateFavoriteStatusHandler = async (req, res) => {
  const contactId = req.params.contactId;

  try {
    const updatedContact = await updateStatusContact(contactId, req.body);
    if (!updatedContact) {
      return res.status(404).send({ message: "Nie znaleziono kontaktu" });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    if (error.message === "missing field favorite") {
      return res.status(400).send({ message: "missing field favorite" });
    }
    return res.status(500).send({ message: "Wystąpił błąd serwera" });
  }
};
