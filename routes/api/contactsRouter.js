import express from "express";
import contactsService from '../../controllers/contacts-controllers.js';
import httpError from "../../helpers/httpError.js";
import Joi from "joi";

const contactsRouter = express.Router();
const contactsAddSchema = Joi.object({
   name: Joi.string().required(),
   email: Joi.string().required(),
   phone:Joi.string().required(),
})

contactsRouter.get('/', async (req, res, next) => {
   try {
      const result = await contactsService.listContacts();
      res.json({ result });
   } catch (error) {
      next(error);
   }
});

// contactsRouter.get('/:contactId', async (req, res, next) => {
//    try {
//       const { contactId } = req.params;
//       const result = await contactsService.getContactById(contactId);
//       if (!result) {
//          throw httpError(404, `Contact with id=${contactId} not found`);
//       }
//       res.json(result);
//    }  catch (error) {
//       next(error);
//    }
// });

// contactsRouter.post('/', async (req, res, next) => {
//    try {
//       const { error } = contactsAddSchema.validate(req.body);
//       if (error) {
//          throw httpError(404, error.message);
//       }
//       // console.log(req.body);
//       const result = await contactsService.addContact(req.body);
//       res.status(201).json(result);
//    } catch (error) {
//       next(error);
//    }
// });

// contactsRouter.put('/:contactId', async (req, res, next) => {
//    try {
//       const { error } = contactsAddSchema.validate(req.body);
//       if (error) {
//          throw httpError(404, error.message);
//       }
//       const { contactId } = req.params;
//       const result = await contactsService.updateContactById(contactId, req.body);
//       if (!result) {
//          throw httpError(404, `Contact with id=${contactId} not found`);
//       }
//       res.json(result);
//    } catch (error) {
//       next(error);
//    }
// });

// contactsRouter.delete('/:contactId', async (req, res, next) => {
//    try {
//       const { contactId } = req.params;      
//       const result = await contactsService.removeContact(contactId);
//       if (!result) {
//          throw httpError(404, `Contact with id=${contactId} not found`);
//       }
//       res.json({
//          message: "Delete success"
//       });
//    } catch (error) {
//       next(error);
//    }
// });

export default contactsRouter;
