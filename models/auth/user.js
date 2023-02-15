const { User } = require("./userSchema");
// const { HttpError } = require("../../helpers/HttpError");

const registerUser = async (req) => {
  await User.create(req.body);
  const {name, email} = req.body
  return { name, email};
};

// const getContactById = async (req, res) => {
// const {contactId} = req.params;
//   const contact = await ContactsList.findById(contactId);
//   if (!contact) {
//     throw HttpError(404, "Not found");
//   }
//   return contact;
// };

// const removeContact = async (req, res) => {
// const {contactId} = req.params;
//   const contact = await ContactsList.findByIdAndRemove(contactId);
//   if (!contact) {
//     throw HttpError(404, "Not found");
//   }
//   return({
//     message: "Delete success",
//   });
// };

// const addContact = async (req, res) => {
//   const newContact = await ContactsList.create(req.body);
//   return newContact;
// };

// const updateContact = async (req, res) => {
//   const {contactId} = req.params;

//   const contact = await ContactsList.findByIdAndUpdate(contactId, req.body, {
//     new: true,
//   });
//   if (!contact) {
//     throw HttpError(404, "Not found");
//   }
//   return contact;
// };

// const updateFavorite = async (req, res) => {
//   const { contactId } = req.params;
//   const contact = await ContactsList.findByIdAndUpdate(contactId, req.body, {
//     new: true,
//   });
//   if (!contact) {
//     throw HttpError(404, `Not found`);
//   }
//   return contact;
// };

module.exports = {
  registerUser,
  // getContactById,
  // removeContact,
  // addContact,
  // updateContact,
  // updateFavorite,
};
