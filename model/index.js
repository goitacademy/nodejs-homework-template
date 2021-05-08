const Contact = require('./schemas/contact');

const listContacts = async (userId) => {
  const result = await Contact.find({ owner: userId }).populate({
    path: 'owner',
    select: 'email -_id',
  });
  return result;
};

const getContactById = async (userId, id) => {
  const result = await Contact.findOne({ _id: id, owner: userId }).populate({
    path: 'owner',
    select: 'email -_id',
  });
  return result;
};

const addContact = async (userId, body) => {
  const result = await Contact.create({ ...body, owner: userId });
  return result;
};

const removeContact = async (userId, id) => {
  const result = Contact.findByIdAndRemove({ _id: id, owner: userId });
  return result;
};

const updateContact = async (userId, id, body) => {
  const result = Contact.findByIdAndUpdate(
    { _id: id, owner: userId },
    { ...body },
    { new: true }
  );
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
