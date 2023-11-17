import { HttpError } from "../helpers/index.js";
import Contact from "../models/Сontacts.js";

export const contactsGet = async (req, res, next) => {
  const result = await Contact.find();
  res.json(result);
};

export const contactGetById = async (req, res, next) => {
  const id = req.params.contactId;
  const result = await Contact.findById(id);
  if (!result) {
    return next(HttpError(404, "Not found"));
  }
  res.json(result);
};

// export const add = async (req, res, next) => {
//   const result = await addContact(req.body);
//   res.status(201).json(result);
// };

// export const remove = async (req, res, next) => {
//   const id = req.params.contactId;
//   const result = await removeContact(id);
//   if (!result) {
//     return next(HttpError(404, "Not found"));
//   }
//   res.status(200).json({ message: "Contact deleted" });
// };

// export const updateById = async (req, res, next) => {
//   const id = req.params.contactId;
//   const body = req.body;
//   const result = await updateContact(id, body);
//   if (!result) {
//     return next(HttpError(404, "Not found"));
//   }
//   res.status(200).json(result);
// };
