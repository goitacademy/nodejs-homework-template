import express from "express";
import HttpError from "../../helpers/HttpError.js";
import contactsService from "../../models/contacts.js";
import contactsAddSchema from '../../helpers/validate.js';

const contactsRouter = express.Router();

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
      throw HttpError(404);
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
      throw HttpError(400, error.message)
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result)
  } catch (error) {
    next(error)
  };
})

contactsRouter.delete('/:id', async (req, res, next) => {
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

contactsRouter.put('/:id', async (req, res, next) => {
 try {

  if (Object.keys(req.body).length === 0) {
    throw HttpError(400)
  }

  const {error} = contactsAddSchema.validate(req.body);
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

export default contactsRouter;
