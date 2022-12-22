// const {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
//   optionaUpdatelContact,
// } = require("../models/contacts");

// const { getCollections } = require("../db/connections.js");
const ObjectId = require("mongodb").ObjectId;
const { Contact } = require("../db/PostModel");

const getContactsList = async (req, res, next) => {
  // const contactsList = await listContacts();
  // const { Contacts } = req.db;
  const contactsList = await Contact.find({});
  res.json({ message: contactsList });
};

const contactById = async (req, res, next) => {
  const id = req.params.contactId;
  // const contactById = await getContactById(id);
  const contactById = await Contact.findById(id);
  if (contactById === null) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json({ message: contactById });
};
const addNewContact = async (req, res, next) => {
  const {
    body: { name, email, phone, favorite },
  } = req;
  // const contactAdd = await addContact(body);

  const contact = new Contact({ name, email, phone, favorite });
  await contact.save();
  res.status(201).json({ message: contact });
};
const deleteContact = async (req, res, next) => {
  const id = req.params.contactId;
  // const contactRemovedById = await removeContact(id);
  const contactRemovedById = await Contact.findByIdAndRemove(id);
  if (contactRemovedById === null) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json({ message: "contact deleted" });
};
const contactUpdate = async (req, res, next) => {
  const {
    body: { name, email, phone, favorite },
  } = req;
  const id = req.params.contactId;
  // const contactUpdated = await updateContact(contactId, body);
  const contactUpdated = await Contact.findByIdAndUpdate(id, {
    $set: { name, email, phone, favorite },
  });
  if (contactUpdated === null) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json({ message: contactUpdated });
};
const changeContact = async (req, res, next) => {
  const {
    body: { name, email, phone, favorite },
  } = req;
  const id = req.params.contactId;
  let newObject = {};
  if (name) {
    newObject = { ...newObject, name };
  }
  if (email) {
    newObject = { ...newObject, email };
  }
  if (phone) {
    newObject = { ...newObject, phone };
  }
  if (favorite) {
    newObject = { ...newObject, favorite };
  }
  const contactUpdated = await req.db.Contacts.updateOne(
    { _id: ObjectId(id) },
    { $set: newObject }
  );
  if (contactUpdated === null) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json({ message: contactUpdated });
};

module.exports = {
  getContactsList,
  contactById,
  addNewContact,
  deleteContact,
  contactUpdate,
  changeContact,
};
