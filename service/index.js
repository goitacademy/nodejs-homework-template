const Contacts = require("./db-contacts");

const listContacts = async () => {
  return await Contacts.find();
};

const getContactById = async (contactId) => {
  return await Contacts.findOne({ _id: `${contactId}` }).catch((err) =>
    console.log("err", err)
  );
};

const removeContact = async (contactId) => {
  return await Contacts.findOneAndRemove({ _id: contactId }).catch((err) =>
    console.log("err", err)
  );
};

const addContact = async ({ name, email, phone }) => {
  return await Contacts.create({ name, email, phone }).catch((err) =>
    console.log("err", err)
  );
};

const updateContact = async (contactId, body) => {
  return await Contacts.findOneAndUpdate({ _id: contactId }, body).catch(
    (err) => console.log("err", err)
  );
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
