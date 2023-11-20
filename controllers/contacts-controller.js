// import contactService from "../models/contacts/index.js";
import Contact from "../models/Contact.js";

import { ctrlWrapper } from "../decorators/index.js";

import { HttpError } from "../helpers/index.js";

// import {
//   contactAddSchema,
//   contactUpdateSchema,
// } from "../schemas/contact-schemas.js";

const getAll = async (req, res) => {
  const result = await Contact.find({}, "-createdAT -updatedAT");
  res.json(result);
};

// const getById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await contactService.getContactById(id);
//     if (!result) {
//       throw HttpError(404, `Contact with id=${id} not found`);
//       // const error = new Error(`Movie with id=${id} not found`);
//       // error.status = 404;
//       // throw error;
//       // return res.status(404).json({
//       //     message: `Movie with id=${id} not found`
//       // })
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };

const add = async (req, res, next) => {
  const result = await Contact.create(req.body);

  res.status(201).json(result);
};

// const updateById = async (req, res, next) => {
//   try {
//     const { error } = contactUpdateSchema.validate(req.body);
//     if (error) {
//       throw HttpError(400, error.message);
//     }
//     const { id } = req.params;
//     const result = await contactService.updateContactById(id, req.body);
//     if (!result) {
//       throw HttpError(404, `Contact with id=${id} not found`);
//     }

//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };

// const deleteById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await contactService.removeContactById(id);
//     if (!result) {
//       throw HttpError(404, `Contact with id=${id} not found`);
//     }

//     // res.status(204).send();

//     res.json({
//       message: "Delete success",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export default {
  getAll: ctrlWrapper(getAll),
  // getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  // updateById: ctrlWrapper(updateById),
  // deleteById: ctrlWrapper(deleteById),
};
