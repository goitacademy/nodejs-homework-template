const Contact = require("../models/contact");

const { HttpError, ctrlWrap } = require("../helpers");



const getAll = async (req, res) => {
  const result = await Contact.find();
  res.status(200).json(result);
};

// const getById = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await contacts.getContactById(contactId);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.status(200).json(result);
// };

const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

// const remove = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await contacts.removeContact(contactId);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json({ message: "contact deleted" });
// };

// const updateByID = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await contacts.updateContactById(contactId, req.body);
//   console.log(result);
//     if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.status(200).json(result);
// };

module.exports = {
  getAll: ctrlWrap(getAll),
  // getById: ctrlWrap(getById),
  add: ctrlWrap(add),
  // remove: ctrlWrap(remove),
  // updateByID: ctrlWrap(updateByID),
};
