import express from "express";
import HttpError from "../../helpers/HttpError.js";
import contactsService from "../../models/contacts.js";
import Joi from "joi";

const router = express.Router();

const contactsAddSchema = Joi.object({
  name: Joi.string().required().messages({'any.required': 'missing required "name" field'}),
  email: Joi.string().required().messages({'any.required': 'missing required "email" field'}),
  phone: Joi.string().required().messages({'any.required': 'missing required "phone" field'})
})

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.getContactById(id);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const {error} = contactsSchema.validate(req.body);
    if(error) {
      throw HttpError(400, error.message)
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result)
  } catch (error) {
    next(error)
  };
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.removeContact(id);

    if (!result) {
      throw HttpError(404);
    }

    res.json({message: "contact deleted"})
  } catch (error) {
    next(error)
  }

})

router.put('/:id', async (req, res, next) => {
 try {
  const {error} = contactsSchema.validate(req.body);
    if(error) {
      throw HttpError(400, error.message)
    }
    const { id } = req.params;
    const result = await contactsService.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);

 } catch (error) {
  next(error)
 }
})

export default router;