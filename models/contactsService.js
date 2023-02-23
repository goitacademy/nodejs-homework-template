const Contacts = require("./contactsSchema");

const listContacts = async () => {
  const data = await Contacts.find({});
  return data;
};

const getContactById = async (contactId) => {
  const data = await Contacts.findById({ _id: contactId });
  return data;
};

const addContact = async (body) => {
  const data = await Contacts.create(body);
  return data;
};

const removeContact = async (contactId) => {
  const data = await Contacts.findByIdAndDelete({ _id: contactId });
  return data;
};

const updateContactById = async (contactId, body) => {
  const data = await Contacts.findByIdAndUpdate(
    { _id: contactId },
    { ...body },
    { new: true }
  );
  console.log(data);
  return data;
};

const updateStatusContactbyId = async (contactId, { favorite }) => {
  const data = await Contacts.findOneAndUpdate(
    { _id: contactId },
    { $set: { favorite } },
    { new: true }
  );
  return data;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
  updateStatusContactbyId,
};
