const { Contact } = require('../models/contact');
const { HttpError } = require('../helpers');
const { ctrlWrapper } = require('../utils');

const getAllContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  // const result = await Contact.findOne({ _id: id });
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, `Contact with id ${id} not found`);
  }
  res.json(result);
};

const addContact = async (req, res) => {
  console.log(req.body);
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

// const updateContactById = async (req, res) => {
//   const { id } = req.params;
//   const result = await contactsService.updateContact(id, req.body);
//   if (!result) {
//     throw HttpError(404, `Contact with id ${id} not found`);
//   }
//   res.json(result);
// };

// const deleteContactById = async (req, res) => {
//   const { id } = req.params;
//   const result = await contactsService.removeContact(id);
//   if (!result) {
//     throw HttpError(404, `Contact with id ${id} not found`);
//   }
//   // res.json(result);
//   // res.status(204).send();
//   res.json({
//     message: `contact deleted`,
//   });
// };

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  // updateContactById: ctrlWrapper(updateContactById),
  // deleteContactById: ctrlWrapper(deleteContactById),
};
