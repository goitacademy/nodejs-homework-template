
const Contact = require('../model/contact');

const listContacts = async (userId, query) => {
  // const result = await Contact.find({ owner: userId }).populate({path:'owner',select:'name email subscription createdAt'});
  const { filter,limit, page, sortBy, sortByDesc,isFavorite = null } = query;
  const searchOptions = { owner: userId };

  if (isFavorite !== null) {
    console.log(typeof isFavorite)
    searchOptions.isFavorite = isFavorite;
  }

  const result = await Contact.paginate(searchOptions, {
    limit,
    page,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
    select: filter?filter.split('|').join(' '):'',
    populate: {
      path: 'owner',
      select: 'name email subscription createdAt',
    },
  });

  const { docs: contacts } = result;

  delete result.docs;

  return { ...result, contacts };
};

const getContactById = async (contactId, userId) => {
  const result = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate({ path: 'owner', select: 'name email subscription createdAt' });

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
