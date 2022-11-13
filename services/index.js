const Contact = require("../models");

const getAll = async () => {
  return await Contact.find({});
  // return data;
};

const getById = async (contactId) => {
  return await Contact.findOne({_id: contactId});
  // return data;
};

const add = async (body) => {
  return await Contact.create(body);
  // return data;
};

const update = async (contactId, body) => {
  return await Contact.findByIdAndUpdate(
    {_id: contactId},
    {...body},
    {new: true}
  );
  // return data;
};

const remove = async (contactId) => {
  return await Contact.findByIdAndRemove({_id: contactId});
  // return data;
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
};
