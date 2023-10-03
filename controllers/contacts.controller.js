// import { nanoid } from "nanoid";
// import * as contactsService from "../models/contacts/index.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

import Contact from "../models/contacts/contact.js";

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.status(200).json(result);
};

// const getById = async (req, res) => {
//   const { id } = req.params;
//   const result = await contactsService.getContactById(id);

//   if (!result) {
//     throw HttpError(404, `Contact with ${id} not found`);
//   }

//   res.status(200).json(result);
// };

// const add = async (req, res) => {
//   const result = await contactsService.addContact({
//     id: nanoid(),
//     ...req.body,
//   });
//   res.status(201).json(result);
// };

// const deleteById = async (req, res) => {
//   const { id } = req.params;
//   const result = await contactsService.removeContact(id);

//   if (!result) {
//     throw HttpError(404, `Contact with ${id} not found`);
//   }

//   res.json({ message: "Delete success" });
// };

// const updateById = async (req, res) => {
//   const { id } = reg.params;
//   const result = await contactsService.updateContact(id, req.body);

//   if (!result) {
//     throw HttpError(404, `Contact with ${id} not found`);
//     res.status(200).json(result);
//   }
// };

export default {
  getAll: ctrlWrapper(getAll),
  // getById: ctrlWrapper(getById),
  // add: ctrlWrapper(add),
  // deleteById: ctrlWrapper(deleteById),
  // updateById: ctrlWrapper(updateById),
};
