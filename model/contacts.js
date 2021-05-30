const Contact = require("./schemas/contact");

const listContacts = async () => {
  const results = await Contact.find({});
  return results;
}

const getById = async (id) => {
   const result = await Contact.findOne({_id:id});
  return result;
}

const removeContact = async (id) => {
  const  result= await Contact.findByIdAndRemove({ _id:id });
  return result;
}

const create = async (body) => {
  const result = await Contact.create(body);
  return result;
}

const update = async (id, body) => {
  const result = await Contact.findOneAndUpdate(
    { _id: id },
    {...body},
    { new: true });
  return result;
}

const updateStatusContact = async (id, body) => {
  const result = await Contact.findOneAndUpdate(
    { _id: id },
    {...body},
    { new: true });
  return result;
}

module.exports = {
  listContacts,
  getById,
  removeContact,
  create,
  update,
  updateStatusContact,
}
