const Contact = require('./schemas/contact');

const getAll = async (
  userId,
  { sortBy, sortByDesc, filter, limit = '5', offset = '0' }
) => {
  const results = await Contact.paginate(
    { owner: userId },
    {
      limit,
      offset,
      sort: {
        ...(sortBy ? { [`${sortBy}`]: 1 } : {}), // if sortBy = email => email : 1
        ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}), // email: -1
      },
      select: filter ? filter.split('|').join(' ') : '',
      populate: {
        path: 'owner',
        select: 'name email',
      },
    }
  );

  const { docs: contacts, totalDocs: total } = results;

  return { total: total.toString(), limit, contacts, offset };
};

const getById = async (contactId, userId) => {
  const result = await Contact.findOne({ _id: contactId, owner: userId });
  return result;
};

const remove = async (contactId, userId) => {
  const result = await Contact.findOneAndRemove({
    _id: contactId,
    owner: userId,
  });
  return result;
};

const create = async (body) => {
  const result = await Contact.create(body);
  return result;
};

const update = async (contactId, body, userId) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true }
  );
  return result;
};

module.exports = {
  getAll,
  getById,
  remove,
  create,
  update,
};
