import Contact from '../models/Contact.js'
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

// const getById = async (req, res, next) => {
//   const { contactId } = req.params;
//   const result = await getContactById(contactId);
//   if (!result) {
//     HttpError(404, `Not found`);
//   }
//   res.json(result);
// };

const add = async (req, res, next) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

// const removeById = async (req, res, next) => {
//   const { contactId } = req.params;
//   const result = await removeContact(contactId);
//   if (!result) {
//     throw HttpError(404, `not found`);
//   }
//   res.status(200).json({ message: "contact deleted" });
// };

// const updateById = async (req, res, next) => {
//   const { contactId } = req.params;
//   const result = await updateContactById(contactId, req.body);
//   if (!result) {
//     throw HttpError(404, `Not found`);
//   }
//   res.json(result);
// };

export default {
  getAll: ctrlWrapper(getAll),
  // getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  // removeById: ctrlWrapper(removeById),
  // updateById: ctrlWrapper(updateById),
};

