const Contact = require('./schemas/contact');

const getAll = async (userId) => {
  const results = await Contact.find({ owner: userId }).populate({
    path: 'owner',
    select: 'email -_id',
  });
  return results;
};

const getById = async (contactId, userId) => {
  const result = await Contact.findOne({ _id: contactId, owner: userId });
  return result;
};

const remove = async (contactId, userId) => {
  const result = await Contact.findByIdAndRemove({
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
