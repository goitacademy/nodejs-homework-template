import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContactById,
  updateContactById,
  updateFavoriteById
} from "../services/contacts.js";

export const getContacts = async (req, res, next) => {
  try {
    const contacts = await getAllContacts();
    res.status(200).json({ data: contacts });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

export const getById = async (req, res) => {
  try {
    const contactId = req.params.contactId;
    const contact = await getContactById(contactId);
    if (contact) {
      res.status(200).json({ data: contact });
    } else {
      res.status(404).json({ message: `Such contact with id: ${contactId} doesn't exist!` });
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const removeContact = async (req, res) => {
  try {
    const contactId = req.params.contactId;
    const contact = await deleteContactById(contactId);
    if (contact) {
      res.status(200).json({ data: contact });
    } else {
      res.status(404).json({ message: `Such contact with id: ${contactId} doesn't exist!` });
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const addContact = async (req, res) => {
  try {
    const body = req.body;
    const newContact = await createContact(body);
    res.status(201).json({ data: newContact });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

export const updateContact = async (req, res) => {
  try {
    const body = req.body;
    const contactId = req.params.contactId;
    const contact = await updateContactById(contactId, body);
    if (contact) {
      res.status(200).json({ data: contact });
    } else {
      res.status(404).json({ message: `Such contact with id: ${contactId} doesn't exist!` });
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const updateStatusByID = async (req, res) => {
  try {
    const body = req.body;
    const contactId = req.params.contactId;
    if (!body.hasOwnProperty('favorite')) {
      return res.status(400).json({ message: "missing field favorite" });
    }
    const contact = await updateFavoriteById(contactId, body.favorite);
    if (contact) {
      res.status(200).json({ data: contact });
    } else {
      res.status(404).json({ message: `Such contact with id: ${contactId} doesn't exist!` });
    }
  } catch (err) {
    res.status(404).json(err.message);
  }
};
