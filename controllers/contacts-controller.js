import Contact from '../models/contact.js';
import { ctrlWrapper } from '../decorators/index.js';

import { HttpError } from '../helpers/index.js';

const getAll = async (req, res, next) => {
  const result = await Contact.find();
  res.json(result);
};

// const getById = async (req, res, next) => {
//   const { contactId } = req.params;
//   const result = await contactsService.getContactById(contactId);
//   if (!result) {
//     throw HttpError(404);
//   }
//   res.json(result);
// };

// const add = async (req, res, next) => {
//   const result = await contactsService.addContact(req.body);
//   res.status(201).json(result);
// };

// const updateById = async (req, res, next) => {
//   const { contactId } = req.params;
//   const result = await contactsService.updateContactById(contactId, req.body);
//   if (!result) {
//     throw HttpError(404);
//   }

//   res.json(result);
// };

// const deleteById = async (req, res, next) => {
//   const { contactId } = req.params;
//   const result = await contactsService.removeContact(contactId);
//   if (!result) {
//     throw HttpError(404);
//   }
//   res.json({ message: 'contact deleted' });
// };

export default {
  getAll: ctrlWrapper(getAll),
  // getById: ctrlWrapper(getById),
  // add: ctrlWrapper(add),
  // updateById: ctrlWrapper(updateById),
  // deleteById: ctrlWrapper(deleteById),
};
