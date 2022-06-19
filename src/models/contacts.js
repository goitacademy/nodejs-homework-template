const { Contacts } = require("./contactsShema");

const listContacts = async () => {
  const data = await Contacts.find();
  return data;
};

const getContactById = async (contactId) => {
  const data = await Contacts.findById(contactId);
  // if (!data) {
  //   throw new WrongParametrsError(`no contact with id ${id}`);
  // }
  return data;
};

const addContact = async ({ name, email, phone }) => {
  const newContact = new Contacts({
    name,
    email,
    phone,
  });
  const data = await newContact.save();
  return data;
};

const removeContact = async (contactId) => {
  const data = await Contacts.findByIdAndRemove(contactId);
  return data;
};

const updateContact = async (contactId, body) => {
  const data = await Contacts.findByIdAndUpdate(
    contactId,
    { $set: body },
    { new: true }
  );
  return data;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
