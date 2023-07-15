import express from "express";

import contactsService from "../../models/contacts.js";

const contactsRouter = express.Router()

contactsRouter.get('/', async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
  res.json(result);
  } catch (error) {
    res.status(500).json({message: "Server error"})
  }
})

contactsRouter.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await contactsService.getContactById(id);
    if(!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.json(result)
  } catch (error) {
    const {status = 500, message = "Server error" } = error;

    res.status(status).json({message,})
  }
})

// contactsRouter.post('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// contactsRouter.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// contactsRouter.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

export default contactsRouter;