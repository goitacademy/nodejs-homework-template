const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const get = async (req, res, next) => {
  res.json(await listContacts());
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);
  if (!result) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.json(result);
  }
};

const remove = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  if (!result) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.status(200).json({ message: "contact deleted" });
  }
};

const add = async (req, res, next) => {
  res.status(201).json(await addContact(req.body));
};

const update = async (req, res, next) => {
  const { contactId } = req.params;

  res.json(await updateContact(contactId, req.body));
};

module.exports = {
  get,
  getById,
  remove,
  add,
  update,
};
