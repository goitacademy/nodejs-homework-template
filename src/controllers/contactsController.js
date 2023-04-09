
const {
  getContacts,
  getContactByID,
  addContact,
  deleteContactById,
  changeContactById,
  patchContactById,
  updateStatusContact,
} = require("../services/contactsService");

  const getContactsController = async (req, res, next) => {
    const contacts = await getContacts();
    res.json(contacts);
  };

  const getContactByIdController = async (req, res, next) => {
    const {contactId} = req.params;
    const contact = await getContactByID(contactId);
    res.json(contact);
  };

  const addContactController = async (req, res, next) => {
    const newContact = await addContact(req.body);
    res.status(201).json({newContact});
  };

  const removeContactController = async (req, res, next) => {
    const {contactId} = req.params;
    await deleteContactById(contactId);
    res.json({messege: "contact deleted"});
  };

  const updateContactController = async (req, res, nex) => {
    const {contactId} = req.params;
    await changeContactById(contactId, req.body);
    const updatedContact = await getContactByID(contactId);
    res.status(200).json(updatedContact);
  };

  const patchContactController = async (req, res, next) => {
    const {contactId} = req.params;
    await patchContactById(contactId, req.body);
    const updatedContact = await getContactByID(contactId);
    res.status(200).json(updatedContact);
  };

  const updateStatusContactController = async (req, res, next) => {
    const {contactId} = req.params;
    await updateStatusContact(contactId, req.body);
    const updatedContact = await getContactByID(contactId);
    res.status(200).json(updatedContact);
  };

  module.exports = {
    getContactsController,
    getContactByIdController,
    addContactController,
    removeContactController,
    updateContactController,
    patchContactController,
    updateStatusContactController,
  };