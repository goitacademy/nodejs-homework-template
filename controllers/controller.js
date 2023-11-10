const Contact = require("../models/contactModel");

async function getContacts(req, res, next) {
  try {
    const contacts = await Contact.find().exec();
    res.send(contacts);
  } catch (error) {
    next(error);
  }
}

function getContact(req, res, next) {
  const { id } = req.params;
  res.send(`get one contact id = ${id}`);
}

function createContact(req, res, next) {
  res.send("create contact");
}

function updateContact(req, res, next) {
  const { id } = req.params;
  res.send(`UPD contact with id ${id}`);
}
function deleteContact(req, res, next) {
  const { id } = req.params;
  res.send(`delete contact with id ${id}`);
}

function updateStatusContact(req, res, next) {
  const { id } = req.params;
  res.send(`upd status contact with id ${id}`);
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
  updateStatusContact,
};
