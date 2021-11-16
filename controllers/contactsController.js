const contactsAPI = require('../model/index');

const getContacts = async (_, res) => {
  try {
    const contacts = await contactsAPI.listContacts();

    if (!contacts) return res.status(500).json({ message: 'Sorry, no contacts found' });
    res.status(200).send(contacts);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getContactById = async (req, res) => {
  try {
    const contactId = req.params.contactId;
    const contact = await contactsAPI.getContactById(contactId);

    if (!contact) throw new error(`Contact with id ${contactId} was not found`);

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const postContact = async (req, res) => {
  try {
    const body = req.body;
    const contact = await contactsAPI.addContact(body);

    if (!contact) return res.status(500);
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const putContact = async (req, res) => {
  try {
    const body = req.body;
    const contactId = req.params.contactId;
    const contact = await contactsAPI.updateContact(contactId, body);

    if (!contact) return res.status(404).json({ message: 'Such contact was not found' });

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteContact = async (req, res) => {
  try {
    const id = req.params.contactId;
    const contact = await contactsAPI.removeContact(id);

    if (!contact) return res.status(404).json({ message: `Contact with id ${id} was not found` });
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getContacts,
  getContactById,
  postContact,
  putContact,
  deleteContact,
};
