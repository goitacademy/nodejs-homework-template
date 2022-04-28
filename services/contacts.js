const { NotFound } = require('http-errors');
const { model } = require('../models/contacts');

const addContact = async reqParams => await model.create(reqParams);

const getContacts = async () => await model.find();

const getContact = async id => await model.findById(id);

const updateContact = async (id, reqParams) =>
  await model.findByIdAndUpdate(id, reqParams, {
    new: true,
    runValidators: true,
  });

const deleteContact = async id => {
  const result = await model.deleteOne({ _id: id });
  if (!result.deletedCount) throw new NotFound('Contact not found');
};

exports.service = {
  addContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
};
