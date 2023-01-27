const { services: srv } = require("../../service");

const listContactsController = async (req, res) => {
  const contacts = await srv.getContacts();
  res.json({ contacts });
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

const updateStatusContactController = async (req, res) => {
  const { id } = req.params;
  const updatedContact = await srv.updateStatusContact(id, req.body);
  if (!updatedContact) {
    res.json.status(404)({ message: "Not found" });
  }
  res.json(updatedContact);
};

const removeContactController = async (req, res) => {
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
