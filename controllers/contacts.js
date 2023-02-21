const { HttpError, ctrlWrapper } = require('../helpers');
const { isEmpty } = require('lodash');
const { Contact } = require('../models/index.js');
const HttpSuccess = require('../helpers/HttpSuccess.js');

const getContacts = async (req, res) => {
  const data = await Contact.find({});
  return res.json(HttpSuccess({ data }));
};
const getContactById = async (req, res) => {
  const { id } = req.params;
  const data = await Contact.findById(id);

  if (!data) {
    throw HttpError({ status: 404, message: "Contact doesn't exist" });
  }
  res.json(HttpSuccess({ data }));
};
const addContact = async (req, res) => {
  const data = await Contact.create(req.body);
  res.status(201).json(HttpSuccess({ code: 201, data }));
};
const updateContact = async (req, res, next) => {
  if (isEmpty(req.body)) {
    throw HttpError({ status: 400, message: 'Missing fields' });
  }
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError({ status: 404, message: 'Contact not found!' });
  }
  res.json(HttpSuccess({ data: result, message: 'Updated successfully' }));
};
const removeContact = async (req, res) => {
  const { id } = req.params;
  const removedContact = await Contact.findByIdAndRemove(id);
  if (!removedContact) {
    throw HttpError({
      status: 404,
      message: "You can't remove contact which is not exist",
    });
  }
  res.json(
    HttpSuccess({
      data: removeContact.id,
      message: 'Contact deleted',
      code: 204,
    })
  );
};

const setFavorite = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.json(
    HttpSuccess({
      data: result,
      message: 'Contact updated',
    })
  );
};

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  removeContact: ctrlWrapper(removeContact),
  updateStatus: ctrlWrapper(setFavorite),
};
