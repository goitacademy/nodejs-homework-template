import Contact from "../models/Contact.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  // const result = await Contact.findOne({_id: contactId});
  const result = await Contact.findById(contactId);
  if (!result) {
    HttpError(404, `Not found`);
  }
  res.json(result);
};

const add = async (req, res, next) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const removeById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, `not found`);
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  console.log(contactId)
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};

// const addToFavorites = wrapperAsync(async (req, res) => {
//   const { contactId } = req.params;
//   const { body } = req;
//   const result = await updateContact(contactId, body);
//   if (!result) {
//     return res.status(400).json({ message: "Missing field favorite" });
//   }
//   if (result) {
//     return res.status(200).json(result);
//   } else {
//     return res.status(404).json({ message: "Not found" });
//   }
// });

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  removeById: ctrlWrapper(removeById),
  updateById: ctrlWrapper(updateById),
};
