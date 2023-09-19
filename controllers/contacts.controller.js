import {
  deleteContact,
  getAllContact,
  getContact,
  patchContact,
  updateStatusContact,
  addContacts,
} from "../daos/contacts.dao.js";

export const getAllContactsHandler = async (_, res, next) => {
  try {
    const contacts = await getAllContact();
    return res.json({ contacts });
  } catch (error) {
    console.error("An error occurred while retrieving contacts:", error);
    next(error);
  }
};

export const getContactHandler = async (req, res) => {
  try {
    const contactId = req.params.id;
    const contact = await getContact(contactId);
    if (!contact) {
      return res.status(404).send();
    }
    res.json({ contact });
  } catch (error) {
    console.error("An error occurred while retrieving the contact:", error);
    return res.status(500).send({ message: "Server error" });
  }
};

export const createContactsHandler = async (req, res) => {
  const contactsToCreate = Array.isArray(req.body) ? req.body : [req.body];

  for (const contact of contactsToCreate) {
    if (!contact.email) {
      return res
        .status(400)
        .send({ error: "Email is required for each contact" });
    }
  }

  try {
    const createdContacts = await addContacts(contactsToCreate);
    return res.status(201).json({ contacts: createdContacts });
  } catch (error) {
    console.error("An error occurred while adding contacts:", error);
    return res
      .status(500)
      .send({ error: "An error occurred while adding contacts" });
  }
};

export const updateContactHandler = async (req, res) => {
  try {
    const contactId = req.params.id;
    const contactToUpdate = req.body;
    const updatedContact = await patchContact(contactId, contactToUpdate);
    if (!updatedContact) {
      return res.status(404).send({ message: "Contact not found" });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    console.error("An error occurred while updating the contact:", error);
    return res.status(500).send({ message: "Server error" });
  }
};

export const deleteContactHandler = async (req, res) => {
  try {
    const contactId = req.params.id;
    await deleteContact(contactId);
    return res.status(204).send();
  } catch (error) {
    console.error("An error occurred while deleting the contact:", error);
    return res.status(500).send({ message: "Server error" });
  }
};

export const updateFavoriteStatusHandler = async (req, res) => {
  try {
    const contactId = req.params.contactId;
    const updatedContact = await updateStatusContact(contactId, req.body);
    if (!updatedContact) {
      return res.status(404).send({ message: "Contact not found" });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    if (error.message === "missing field favorite") {
      return res.status(400).send({ message: "missing field favorite" });
    }
    console.error("A server error occurred:", error);
    return res.status(500).send({ message: "Server error" });
  }
};
