// const Joi = require('joi')
// const {
// Types: { ObjectId },
// } = require('mongoose')
const Contact = require("./mongoose.js");

async function getContacts(req, res) {
  const contacts = await Contact.find({});
  res.json(contacts);
}

async function findContactById(req, res) {
  const {
    params: { contactId },
  } = req;
  const contactById = await Contact.findById(contactId);
  if (!contactById) res.status(400).send({ message: "Not found" });
  res.json(contactById);
}

async function postContact(req, res) {
  try {
    const { body } = req;
    const newContact = await Contact.create(body);
    res.json(newContact);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function deleteContact(req, res) {
  const {
    params: { contactId },
  } = req;
  const removeContact = await Contact.findByIdAndDelete(contactId);
  if (!removeContact) res.status(400).send({ message: "Not found" });
  res.status(200).send({ message: "contact delete" });
}

async function patchContact(req, res) {
  const updateContact = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    {
      new: true,
    }
  );
  if (!updateContact) res.status(400).send({ message: "Not found" });
  res.json(updateContact);
}

async function patchFavorite(req, res) {
  const updateFavorite = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    {
      new: true,
    }
  );
  if (!updateFavorite)
    res.status(400).send({ message: "missing field favorite" });
  res.json(updateFavorite);
}

module.exports = {
  getContacts,
  findContactById,
  postContact,
  deleteContact,
  patchContact,
  patchFavorite,
};
