// const contactsAddSchema = require('../models/contacts');

const Contacts = require('../models/contacts');

// const { HttpError } = require('../helpers');

const { ctrlWrapper } = require('../helpers');

const getAll = async (req, res, next) => {
  try {
    const result = await Contacts.find();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// const getById = async (req, res, next) => {
//   const { id } = req.params;
//   const result = await contactsService.getContactById(id);
//   if (!result) {
//     throw HttpError(404, 'Not found');
//   }
//   res.json(result);
// };

const add = async (req, res) => {
  const result = await Contacts.addContact(req.body);
  res.status(201).json(result);
};

// const updateById = async (req, res, next) => {
//   const { id } = req.params;
//   const result = await contactsService.updateContactsById(id, req.body);
//   if (!result) {
//     throw HttpError(404, 'Not found');
//   }
//   res.json(result);
// };

// const deleteById = async (req, res, next) => {
//   const { id } = req.params;
//   const result = await contactsService.removeContact(id);
//   if (!result) {
//     throw HttpError(404, 'Not found');
//   }
//   res.json({ message: 'contact deleted' });
// };

module.exports = {
  getAll,
  //   getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  //   updateById: ctrlWrapper(updateById),
  //   deleteById: ctrlWrapper(deleteById),
};
