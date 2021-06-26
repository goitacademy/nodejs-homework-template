const Contact = require('./schemas/contacts');

const listContacts = async (
  userId,
  { limit = 20, offset = 0, sortBy, sortByDesc, filter },
) => {
  const result = await Contact.paginate(
    { owner: userId },
    {
      limit,
      offset,
      sort: {
        ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
        ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
      },
      select: filter ? filter.split('|').join(' ') : '',
      populate: {
        path: 'owner',
        select: 'name email phone favorite -_id',
      },
    },
  );
  const { docs: contacts, totalDocs: total } = result;
  return { total, limit, offset, contacts };
};

const getContactById = async (userId, id) => {
  const result = await Contact.findById(id, { owner: userId }).populate({
    path: 'owner',
    select: 'name email phone favorite -_id',
  });
  return result;
};

const removeContact = async (userId, id) => {
  const result = await Contact.findByIdAndRemove({ _id: id, owner: userId });
  return result;
};

const addContact = async (body, userId) => {
  const result = await Contact.create(body, userId);
  return result;
};

const updateContact = async (userId, id, body) => {
  const result = await Contact.findByIdAndUpdate(
    { _id: id },
    { owner: userId },
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
