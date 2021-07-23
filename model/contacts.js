const Contacts = require("./schemas/schemas");

const getAll = async () => {
  const results = await Contacts.find({});
  return results;
};

const getById = async (id) => {
  const result = await Contacts.findOne({ _id: id });
  console.log(result.id);
  console.log(result._id);
  return result;
};

const create = async (body) => {
  const result = await Contacts.create(body);
  return result;
};

const update = async (id, body) => {
  const result = await Contacts.findByIdAndUpdate(
    { _id: id },
    { ...body },
    { new: true }
  );
  return result;
};

const remove = async (id) => {
  const result = await Contacts.findByIdAndRemove({ _id: id });
  return result;
};

module.exports = {
  getAll,
  getById,
  remove,
  create,
  update,
};
