const Contact = require("../models/contact");

async function listContacts(req, res, next) {
  try {
    const contacts = await Contact.find().exec();
    res.send(contacts);
  } catch (err) {
    next(err);
  }
}

async function getContactById(req, res, next) {
  const { id } = req.params;
  try {
    const contacts = await Contact.findById(id).exec();
    res.send(contacts);
  } catch (err) {
    next(err);
  }
}

function addContact(req, res, next) {
  res.send("Get list of contacts");
}

function updateContact(req, res, next) {
  const { id } = req.params;

  res.send(`Update book ${id})`);
}

function removeContact(req, res, next) {
  const { id } = req.params;

  res.send(`Delete book ${id})`);
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
