const contacts = require("../models/contacts");

const { httpError, ctrlWrapper } = require("../helpers");


const getAll = async (req, res) => {
    const allContacts = await contacts.listContacts();
    res.status(200).json(allContacts);
};

const getById = async (req, res) => {
  const { id } = req.params;
    const oneContact = await contacts.getContactById(id);
    if (!oneContact) {
      throw httpError(404, "Not found");
    }
    res.status(200).json(oneContact);
};

const add = async (req, res) => { 
    const newContact = await contacts.addContact(req.body);
    res.status(201).json(newContact);
};

const deleteById = async (req, res) => {
    const { id } = req.params;
    const deletedContact = await contacts.removeContact(id);
    if (!deletedContact) {
      throw httpError(404, "Not found");
    }
    res.status(200).json({ massage: "contact deleted" });
}


const updateById = async (req, res) => {
    const { id } = req.params;
    const editedContact = await contacts.updateContact(id, req.body);
    if (!editedContact) {
      throw httpError(404, "Not found");
    }
    res.status(201).json(editedContact);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
};