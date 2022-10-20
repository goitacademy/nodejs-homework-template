const {
    getContact,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateContactStatus,
} = require("../services/contactsService");
const { WrongParametersError } = require("../helpers/errors");

const listContactsController = async (req, res) => {
    const contacts = await getContact();
    res.status(200).json({ contacts });
};
  
const getContactByIdController = async (req, res) => {
    const id = req.params.id;
  
    const contact = await getContactById(id);
  
    if (!contact) {
      throw new WrongParametersError("Not found");
    }
    res.status(200).json(contact);
};
  
const addContactController = async (req, res) => {
    const { name, email, phone, favorite } = req.body;
  
    const contact = await addContact({ name, email, phone, favorite });
    res.status(201).json(contact);
};
  
const removeContactController = async (req, res) => {
    await removeContact(req.params.id);
    res.status(200).json({ message: "contact deleted" });
};
  
const updateContactController = async (req, res) => {
    const id = req.params.id;
    const { name, email, phone } = req.body;
  
    const contact = await updateContact({ name, email, phone }, id);
    res.status(200).json(contact);
};
  
const updateStatusContactController = async (req, res) => {
    const { favorite } = req.body;
    const id = req.params.id;
  
    const contact = await updateContactStatus(id, { favorite });
    res.status(200).json(contact);
};
  
module.exports = {
    listContactsController,
    getContactByIdController,
    removeContactController,
    addContactController,
    updateContactController,
    updateStatusContactController,
};