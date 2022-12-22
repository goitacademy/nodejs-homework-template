/* eslint-disable linebreak-style */
const {Contact} = require('../../models/contactModel');

const get = async () => {
  return await Contact.find({});
};

const getById = async (contactId) => {
  return await Contact.findById(contactId);
};

const add = async (body) => {
  return await Contact.create(body);
};

const remove = async (contactId) => {
  return await Contact.findByIdAndRemove(contactId);
};

const update = async (contactId, body) => {
  return await Contact.findByIdAndUpdate(
      contactId, body, {new: true},
  );
};

module.exports = {
  get,
  getById,
  remove,
  add,
  update,
};
