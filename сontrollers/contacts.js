const { HttpError, ctrlWrapper } = require('../helpers');
const { Contact } = require('../models/contact');

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};
const getById = async (req, res) => {
  console.log(req.params);
  const { contactId } = req.params;
  // const result = await Contact.findOne({ _id: contactId });
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, 'Not Found');
  }
  res.json(result);
};

const add = async (req, res) => {
  // const { error } = addSchema.validate(req.body);
  // if (error) {
  //   throw HttpError(400, "missing required name field");
  // }
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};
const deleteById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, 'Not Found');
  }
  res.status(200).json({
    message: 'contact deleted',
  });
};
const updateContactById = async (req, res) => {
  // const { error } = addSchema.validate(req.body);
  // if (error) {
  //   throw HttpError(400, "missing fields");
  // }
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, 'Not Found');
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  // const { error } = addSchema.validate(req.body);
  // if (error) {
  //   throw HttpError(400, "missing fields");
  // }
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, 'Not Found');
  }
  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateContactById: ctrlWrapper(updateContactById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
