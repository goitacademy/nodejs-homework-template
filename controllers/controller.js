const Contact = require("../models/contactModel");

async function getContacts(req, res, next) {
  try {
    const contacts = await Contact.find().exec();
    res.send(contacts);
  } catch (error) {
    next(error);
  }
}

async function getContact(req, res, next) {
  const { id } = req.params;
  try {
    const contact = await Contact.findById(id).exec();
    if (contact === null) {
      return res.status(404).send("Contact not found");
    }
    console.log(contact);
    res.send(contact);
  } catch (error) {
    next(error);
  }
}

async function createContact(req, res, next) {
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };

  try {
    const result = await Contact.create(contact);
    console.log(result);
    res.end();
  } catch (error) {
    next(error);
  }
}

async function updateContact(req, res, next) {
  const { id } = req.params;
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };

  try {
    const result = await Contact.findByIdAndUpdate(id, contact);
    console.log(result);
    res.end();
  } catch (error) {
    next(error);
  }
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
