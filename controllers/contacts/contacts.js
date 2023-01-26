const { services: srv } = require("../../service");

const listContactsController = async (req, res, next) => {
  try {
    const contacts = await srv.getContacts();
    res.json({ contacts });
  } catch (error) {
    next(error);
  }
};

const getByIdController = async (req, res) => {
  const { id } = req.params;
  const contact = await srv.getContactById(id);
  res.json(contact);
};

const addContactController = async (req, res) => {
  const newContact = await srv.addContact(req.body);
  res.status(201).json(newContact);
};

const updateContactController = async (req, res) => {
  const { id } = req.params;
  const updatedContact = await srv.updateContact(id, req.body);
  res.json(updatedContact);
};

const updateStatusContactController = async (req, res, next) => {
  const { id } = req.params;
  if (!req.body) {
    res.json({ message: "missing field favorite" });
  }
  const updatedContact = await srv.updateStatusContact(id, req.body);

  res.json(updatedContact);
};

const removeContactController = async (req, res, next) => {
  const { id } = req.params;
  await srv.removeContactById(id);
  res.json({ message: "contact deleted" });
};

module.exports = {
  addContactController,
  updateContactController,
  updateStatusContactController,
  listContactsController,
  getByIdController,
  removeContactController,
};
