import express from "express";
import HttpError from "../../helpers/HttpError.js";
import contactsService from "../../models/contacts.js";
import Joi from "joi";

const contactsRouter = express.Router();

const contactsAddSchema = Joi.object({
  name: Joi.string().required().messages({'string.empty': `missing required ${name} field`}),
  email: Joi.string().required().messages({'string.empty': `missing required ${email} field`}),
  phone: Joi.string().required().messages({'string.empty': `missing required ${phone} field`})
})

contactsRouter.get("/", async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.getContactById(id);
    if (!result) {
      throw HttpError(404, error.message);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.post('/', async (req, res, next) => {
  try {
    const {error} = contactsAddSchema.validate(req.body);
    if(error) {
      throw HttpError(400, message.error)
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result)
  } catch (error) {
    next(error)
  };
})

// contactsRouter.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// contactsRouter.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

export default contactsRouter;
