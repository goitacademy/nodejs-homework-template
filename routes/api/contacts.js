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
      res.status(404).json({message: "Not found" })
    }
    res.json(result)
  } catch (error) {
    res.status(500).json({message: "Server error"})
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