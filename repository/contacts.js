const Contact = require('../model/contact');

const listContacts = async (userId, query) => {
  const { limit = 5, page = 1 } = query; // TODO: Add query validation
  const searchOptions = { owner: userId };

  const results = await Contact.paginate(searchOptions, {
    limit,
    page,
    populate: {
      path: 'owner',
      select: 'email subscription createdAt updatedAt',
    },
  });

  const { docs: contacts, ...pageInfo } = results;

  return { pageInfo, contacts };
};

const getContactById = async (contactId, userId) => {
  const result = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate({
    path: 'owner',
    select: 'email subscription createdAt updatedAt -_id',
  });
  return result;
};

const removeContact = async (contactId, userId) => {
  const result = await Contact.findOneAndRemove({
    _id: contactId,
    owner: userId,
  });
  return result;
};

const addContact = async body => {
  const result = await Contact.create(body);
  return result;
};

const updateContact = async (contactId, body, userId) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true },
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
