const Contact = require("../schemas/contactsSchema");

const listContactsRepository = async () => {
  const results = await Contact.find({});

  return results;
};

const getContactByIdRepository = async (id) => {
  const results = await Contact.findOne({ _id: id });
  return results;
};

const addContactRepository = async (body) => {
  const results = await Contact.create(body);

  return results;
};

const removeContactRepository = async (id) => {
  const results = await Contact.findByIdAndRemove({ _id: id });
  return results;
};

const updateContactRepository = async (id, body) => {
  const results = await Contact.findByIdAndUpdate(
    { _id: id },
    { ...body },
    { new: true }
  );
  return results;
};

module.exports = {
  listContactsRepository,
  getContactByIdRepository,
  removeContactRepository,
  addContactRepository,
  updateContactRepository,
};
