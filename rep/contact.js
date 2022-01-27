import Contact from '../model/contact';

const listContacts = async (
  userId,
  { sortBy, sortByDesc, filter, limit = 5, page = 1, favorite },
) => {
  let sortCriteria = null;
  const total = await Contact.find({ owner: userId }).countDocuments();
  const lastPage = Math.ceil(total / limit);
  const skipValue =
    page >= lastPage ? limit * (lastPage - 1) : limit * (page - 1);

  let result = Contact.find({ owner: userId }).populate({
    path: 'owner',
    select: 'name email subscription',
  });

  if (favorite) {
    result = Contact.find({ favorite: true, owner: userId }).populate({
      path: 'owner',
      select: 'name email subscription',
    });
  }

  if (sortBy) {
    sortCriteria = { [`${sortBy}`]: 1 };
  }
  if (sortByDesc) {
    sortCriteria = { [`${sortByDesc}`]: -1 };
  }
  if (filter) {
    result = result.select(filter.split('|').join(' '));
  }

  result = await result.skip(skipValue).limit(Number(limit)).sort(sortCriteria);

  return { total, contacts: result };
};

const getContactById = async (userId, contactId) => {
  const result = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate({
    path: 'owner',
    select: 'name email subscription',
  });
  return result;
};

const removeContact = async (userId, contactId) => {
  const result = await Contact.findOneAndRemove({
    _id: contactId,
    owner: userId,
  });
  return result;
};

const addContact = async (userId, body) => {
  const result = await Contact.create({ ...body, owner: userId });
  return result;
};

const updateContact = async (userId, contactId, body) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true },
  );
  return result;
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};