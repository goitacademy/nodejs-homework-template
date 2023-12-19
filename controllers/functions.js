// import HttpError from "../helpers/index.js";
import decorators from "../decorators/index.js";
import Contact from "../models/Contact.js";

const getAll = async (__, res) => {
  const result = await Contact.find();
  res.json(result);
};

// const getById = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await contacts.getContactById(contactId);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };

// const addContact = async (req, res) => {
//   const result = await contacts.addContact(req.body);
//   res.status(201).json(result);
// };

// const deleteContact = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await contacts.removeContact(contactId);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.status(200).json({ message: "Contact deleted" });
// };

// const updateContact = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await contacts.updateById(contactId, req.body);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };

export default {
  getAll: decorators.ctrlWrapper(getAll),
  // getById: decorators.ctrlWrapper(getById),
  // addContact: decorators.ctrlWrapper(addContact),
  // deleteContact: decorators.ctrlWrapper(deleteContact),
  // updateContact: decorators.ctrlWrapper(updateContact),
};
