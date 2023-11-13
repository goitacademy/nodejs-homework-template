const Contact = require("../models/contact");

async function getContacts(req, res, next) {
  try {
    const contacts = await Contact.find().exec();
    console.log(contacts);
    res.send(contacts);
  } catch (err) {
    next(err);
  }
}
async function getContact(req, res, next) {
  const { id } = req.params;
  try {
    const contact = await Contact.findById(id).exec();
    if (contact === null) {
      return res.status(404).send("Contact not found");
    }
    res.json(contact);
  } catch (err) {
    next(err);
  }
}

async function createContact(req, res, next) {
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite,
  };
  try {
    const result = await Contact.create(contact);
    console.log(result);
    res.end();
  } catch (err) {
    next(err);
  }
}

function updateContact(req, res, next) {
  const { id } = req.params;
  res.send(`Got book ${id}`);
}

function deleteContact(req, res, next) {
  const { id } = req.params;
  res.send(`Deleted book ${id}`);
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
