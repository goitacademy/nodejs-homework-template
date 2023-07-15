import express from "express";
import HttpError from "../../helpers/HttpError.js";

import contactsService from "../../models/contacts.js";

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
  res.json({ message: 'template message' })
})

// contactsRouter.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// contactsRouter.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

export default contactsRouter;
