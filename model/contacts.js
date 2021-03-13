const Contact = require('./schemas/contact');

const listContacts = async (
  userId,
  { sortBy, sortByDesc, filter, limit = '5', page = '1' },
) => {
  const result = await Contact.paginate(
    { owner: userId },
    {
      limit,
      select: filter ? filter.split('|').join(' ') : '',
      page,
      sort: {
        ...(sortBy ? { [`${sortBy}`]: 1 } : {}), //name:1 если sortBy = name
        ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
      },
      populate: {
        path: 'owner',
        select: 'name email subscription -_id',
      },
    },
  );
  const { docs: contact, totalDocs: total, totalPages } = result;
  return {
    total: total.toString(),
    totalPages: totalPages.toString(),
    limit,
    page,
    contact,
  };
};

const getContactById = async id => {
  return await Contact.findOne({ _id: id, owner: userId }).populate({
    path: 'owner',
    select: 'name email subscription -_id',
  });
};

const addContact = async body => {
  const result = await Contact.create(body);
  return result;
};

const updateContact = async (id, body, userId) => {
  return await Contact.findOneAndUpdate(
    { _id: id, owner: userId },
    { ...body },
    { new: true },
  );
};

const removeContact = async (id, userId) => {
  return await Contact.findOneAndRemove({ _id: id, owner: userId });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
