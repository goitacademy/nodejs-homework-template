import express from "express";
// Створюємо об'єкт contactsData, який містить в собі методи обробки і 
// результати обробки данних із відповідного файлу. 
import contactsData from "../../models/contacts.js";
import { HttpError } from "../../helpers/index.js";
import Joi from "joi";

const contactsRouter = express.Router();

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

contactsRouter.get("/", async (req, res, next) => {
  try {
    const result = await contactsData.listContacts();
    res.json(result);
  }
  catch (error) {
    next(error);
  }
});

// при визначенні динамічної частини шляху - наприклад id, який змінюється...
// використовуємо двокарпку : '/:id' таких частин може бути декілька '/:id/:type'

contactsRouter.get("/:contactId", async (req, res, next) => {
  try {
    const result = await contactsData.getContactById(req.params.contactId);
    if (!result) {
      // Це буде часто повторювана операція, яку доречно винести у функцію - хелпер.
      throw HttpError(404, `Contact with id=${id} not found`);
    }
    res.json(result);
  }
  catch (error) {
    next(error);
  }
});

contactsRouter.post("/", async(req, res, next) => {
  try {
    const {error} = contactAddSchema.validate(req.body);
    if(error) { 
      throw HttpError(400, "missing required name field");
    }
    const result = await contactsData.addContact(req.body);
    res.status(201).json(result);
  }
  catch (error) { 
    next(error);
  }
})

contactsRouter.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) { 
      throw HttpError(400, "missing feelds");
    }
    const result = await contactsData.updateContact(req.params.contactId, req.body);
    if (!result) { 
      throw HttpError(404, `Contact with id=${id} not found`);
    }
    res.status(200).json(result);
  }
  catch (error) { 
    next(error);
  } 
})

contactsRouter.delete("/:contactId", async (req, res, next) => {
  try {
    const result = await contactsData.removeContact(req.params.contactId);
    if (!result) {
      throw HttpError(404, `Contact with id=$(id) not found`);
    }
    res.json({
      message: "Delete success"
    })
  }
  catch (error) { 
    next(error);
  }
})

export default contactsRouter;
