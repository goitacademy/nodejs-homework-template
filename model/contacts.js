const Contact = require('./schemas/contact');

const listContacts = async (userId, query) => {
  const { limit = 5, page, favorite = null } = query;
  const optionsSearch = { owner: userId };
  if (favorite !== null) {
    optionsSearch.favorite = favorite;
  }

  const results = await Contact.paginate(optionsSearch, {
    limit,
    page,
  });
  const { docs: contacts, totalDocs: total } = results;
  return { total, limit, page, contacts };
};

const getContactById = async (userId, contactId) => {
  const result = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate({ path: 'owner', select: 'email subscription -_id' });
  return result;
};

const addContact = async body => {
  const result = await Contact.create(body);
  return result;
};

const removeContact = async (userId, contactId) => {
  const result = await Contact.findByIdAndRemove({
    _id: contactId,
    owner: userId,
  });
  return result;
};

const updateContact = async (userId, contactId, body) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    {
      new: true,
    },
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
