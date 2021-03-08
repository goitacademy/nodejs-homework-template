const Contact = require('./schemas/contact');

const listContacts = async (
  userId,
  { sortBy, sortByDesc, filter, limit = '20', page = '1' },
) => {
  const results = await Contact.paginate(
    { owner: userId },
    {
      limit,
      page,
      sort: {
        ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
        ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
      },
      select: filter ? filter.split('|').join(' ') : '',
      populate: {
        path: 'owner',
        select: 'email subscription',
      },
    },
  );

  const { docs: contacts, totalDocs: total } = results;
  return { total: total.toString(), limit, page, contacts };
};

const getContactById = async (id, userId) => {
  const result = await Contact.findOne({ _id: id, owner: userId }).populate({
    path: 'owner',
    select: 'email subscription',
  });
  return result;
};

const addContact = async body => {
  const result = await Contact.create(body);
  return result;
};

const updateContact = async (id, body, userId) => {
  const result = await Contact.findByIdAndUpdate(
    { _id: id, owner: userId },
    { ...body },
    { new: true },
  );

  return result;
};

const removeContact = async (id, userId) => {
  const result = await Contact.findByIdAndRemove({
    _id: id,
    owner: userId,
  });

  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
