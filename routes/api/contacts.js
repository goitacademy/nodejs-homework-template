//const express = require('express')
import { Router } from "express";
import { listContacts } from "../../models/contacts.js";
//const router = express.Router()
export const contactsRouter = Router();


contactsRouter.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  res.json(JSON.parse(contacts))
})

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

//module.exports = router
