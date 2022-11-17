// const {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// } = require("/nodejs-homework-template-vm/models/contacts");

const { Contact } = require("../db/contactModel");

// const { getCollection } = require("../db/connect");
const getContacts = async (req, res) => {
  const contacts = await Contact.find({});
  // const contacts = getCollection();
  // console.log(req.db);
  res.status(201).json({ contacts });
};
const getContactsById = async (req, res) => {
  const { contactId } = req.params;
  const contactbyId = await Contact.findById(contactId);

  if (!contactbyId) {
    res.status(400).json({ message: "not found", code: 400 });
  }
  res.status(200).json({ message: "success", code: 200, contactbyId });
};
const addContacts = async (req, res) => {
  const { name, email, phone, favorite = false } = req.body;
  const contact = new Contact({ name, email, phone, favorite });
  await contact.save();
  // const contact = await addContact(name, email, phone);
  res.status(201).json({ message: "contact added", contact });
};
const putContacts = async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  const contactByUpdate = await Contact.findByIdAndUpdate(contactId, {
    $set: { name, email, phone },
  });
  res.status(201).json({ message: "contact update", contactByUpdate });
};
const removeContacts = async (req, res) => {
  const { contactId } = req.params;

  const contactByRemove = await Contact.findByIdAndRemove(contactId);
  res.status(201).json({ message: "contact deleted", contactByRemove });
};
const putContactsFav = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  // const contactByUpdate = await Contact.findByIdAndUpdate(contactId, {
  //   $set: { favorite },
  // });

  const updatedContact = await Contact.findOneAndUpdate(
    { $and: [{ _id: contactId }] },
    { favorite },
    { new: true }
  );
  if (!updatedContact) {
    res.status(400).json({ message: "Not found" });
    return;
  }
  res.status(200).json({ message: "success", contact: updatedContact });
};

//   res.status(400).json({ message: "missing field favorite", code: 400 });
// };

module.exports = {
  getContacts,
  addContacts,
  getContactsById,
  putContacts,
  removeContacts,
  putContactsFav,
};
