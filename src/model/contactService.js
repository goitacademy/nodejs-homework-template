const { ContactsModel } = require('../db/contactsModel');

const select = '-_id -owner -__v';

// const options = {
//   page: 1,
//   limit: 5,
//   offset: 0,
// };

const listContacts = async (userId, query) => {
  return await ContactsModel.paginate({ owner: userId }, query);
};

const getContactById = async (contactId, userId) => {
  return await ContactsModel.findOne({ _id: contactId, owner: userId }, select);
};

const addContact = async (body, userId) => {
  const newContact = new ContactsModel({ ...body, owner: userId });

  await newContact.save();
  return newContact;
};

const removeContact = async (contactId, userId) => {
  return await ContactsModel.findOneAndRemove({
    _id: contactId,
    owner: userId,
  });
};

const updateContact = async (contactId, body, userId) => {
  return await ContactsModel.findOneAndUpdate(
    { _id: contactId, owner: userId },
    {
      $set: body,
    },
    { new: true }
  );
};

const updateStatusContact = async (contactId, body, userId) => {
  const { favorite } = body;
  return await ContactsModel.findOneAndUpdate(
    { _id: contactId, owner: userId },
    {
      $set: { favorite },
    },
    { new: true }
  );
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
