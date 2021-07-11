const Contact = require("./schema/contact");

const getListContacts = async () => {
  const results = await Contact.find({});

  return results;
};

const getContactById = async (id) => {
  const result = await Contact.findOne({ _id: id });

  return result;
};

const removeContact = async (id) => {
  const result = await Contact.findByIdAndRemove({ _id: id });

  return result;
};

const addContact = async (body) => {
  const result = await Contact.create(body);

  return result;
};

const updateContact = async (id, body) => {
  const result = await Contact.findByIdAndUpdate(
    { _id: id },
    { ...body },
    { new: true }
  );

  return result;
};

module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
