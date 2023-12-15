import express from "express";
import contactsControler from "../../controler/contacts-controler";

const contactsRouter = express.Router()

contactsRouter.get('/', contactsControler.getAll
)

contactsRouter.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

contactsRouter.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

contactsRouter.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

contactsRouter.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

export default contactsRouter;
