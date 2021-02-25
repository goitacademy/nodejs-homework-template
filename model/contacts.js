const Contact = require('./schemas/contact');

const getAll = async () => {
  const results = await Contact.find({});
  return results;
};

const getById = async (contactId) => {
  const result = await Contact.findOne({ _id: contactId });
  return result;
};

const remove = async (contactId) => {
  const result = await Contact.findByIdAndRemove({ _id: contactId });
  return result;
};

const create = async (body) => {
  const result = await Contact.create(body);
  return result;
};

const update = async (contactId, body) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId },
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
