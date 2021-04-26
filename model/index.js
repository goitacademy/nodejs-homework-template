const Contacts = require('./schemas/contacts');

const listContacts = async () => {
  const resolts = await Contacts.find();
  return resolts;
};

const getContactById = async id => {
  const resolt = await Contacts.findOne({ _id: id });
  return resolt;
};

const addContact = async body => {
  const resolt = await Contacts.create(body);
  return resolt;
};

const updateContact = async (id, body) => {
  const result = await Contacts.findByIdAndUpdate(
    { _id: id },
    { ...body },
    { new: true },
  );

  return result;
};

const updateStatusContact = async (id, body) => {
  const result = await Contacts.findByIdAndUpdate(
    { _id: id },
    { ...body },
    { new: true },
  );

  return result;
};

const removeContact = async id => {
  const resolt = await Contacts.findByIdAndRemove({ _id: id });
  return resolt;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
