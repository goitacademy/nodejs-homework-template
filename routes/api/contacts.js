import express from "express";
// import Joi from "joi";
// import contactsService from "../../models/contacts.js";
// import { HttpError } from "../../helpers/index.js";
import contactsController from "../../controllers/contacts-controller.js";
import contactSchemas from '../../schemas/schemas.js';
import {validateBody} from '../../decorator/index.js';
const contactsRouter = express.Router();

// const addContactSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// });

contactsRouter.get("/", contactsController.getAll)
// async (req, res, next) => {
//   try {
//     const result = await contactsService.listContacts();
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// }
//);

contactsRouter.get("/:id", contactsController.getById)
// async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await contactsService.getContactById(id);
//     if (!result) {
//       throw HttpError(404, `Contact with id=${id} not found`);
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// }
//);

contactsRouter.post("/", validateBody(contactSchemas.addContactSchema), contactsController.add)
// async (req, res, next) => {
//   try {
//     const { error } = addContactSchema.validate(req.body);
//     if (error) {
//       throw HttpError(400, error.message);
//     }
//     const result = await contactsService.addContact(req.body);
//     res.status(201).json(result);
//   } catch (error) {
//     next(error);
//   }
// }
//);

contactsRouter.delete("/:id", contactsController.deleteById)
// async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await contactsService.removeContact(id);
//     if (!result) {
//       throw HttpError(404, `Contact with id=${id} not found`);
//     }
//     res.json({ message: "Delete success" });
//   } catch (error) {
//     next(error);
//   }  
// }
//);

contactsRouter.put("/:id", validateBody(contactSchemas.addContactSchema), contactsController.updateById)
// async (req, res, next) => {
//   try {
//     const { error } = addContactSchema.validate(req.body);
//     if (error) {
//       throw HttpError(400, error.message);
//     }
//     const { id } = req.params;
//     const result = await contactsService.updateContact(id, req.body);
//     if (!result) {
//       throw HttpError(404, `Contact with id=${id} not found`);
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// }
//);

export default contactsRouter;
