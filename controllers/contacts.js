const contacts = require("../models/contacts");

const { HttpError, ctrlWrapper } = require("../helpers");


const getAll = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  if (Object.keys(req.body).length === 0) {
      const error = new Error('missing fields');
      error.status = 400;
      throw error;
    }
  
  const contact = await contacts.getContactById(contactId);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    data: { result: contact },
  });
};

const addContact = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json({
    status: 'success',
    code: 201,
    data: { result },
  });
};

// const removeContact = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await contacts.removeContact(contactId);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json({
//     message: "Contact deleted",
//   });
// };

// const upDateById = async (req, res) => {
//   const { contactId } = req.params;
//   if (Object.keys(req.body).length === 0) {
//     throw HttpError(400, 'missing fields');
//   }
 
//   const result = await contacts.updateById(contactId, req.body);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json({
//     status: 'success',
//     code: 201,
//     data: { result },
//   });
// };



// module.exports = {
//   getAll: ctrlWrapper(getAll),
//   getContactById: ctrlWrapper(getContactById),
//   addContact: ctrlWrapper(addContact),
//   removeContact: ctrlWrapper(removeContact),
//   upDateById: ctrlWrapper(upDateById),
// };
