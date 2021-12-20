


import express from 'express'
import model from "../../model/index"
import { validateCreate, validateUpdate, validateId } from "../api/validation"
const router = express.Router()

router.get('/', async (req, res, next) => {
  const contacts = await model.listContacts()
  res.status(200).json({ contacts })
})

router.get('/:id', validateId, async (req, res, next) => {
  const { id } = req.params
  const contact = await model.getContactById(id)
  if (contact) {
    return res.status(200).json(contact)
  }
  res.status(404).json({ "message": "Not found" })
})

router.post('/', validateCreate, async (req, res, next) => {
  const newContact = await model.addContact(req.body)
  res.status(201).json(newContact)
})

router.delete('/:id', validateId, async (req, res, next) => {
  const { id } = req.params
  const contact = await model.removeContact(id)
  if (contact) {
    console.log(contact);
    return res.status(200).json({ "message": `${contact.id} contact deleted` })
  }
  res.status(404).json({ "message": "Not found" })
})

router.put('/:id', validateId, validateUpdate, async (req, res, next) => {
  const { id } = req.params
  const contact = await model.updateContact(id, req.body)
  console.log(req.body);
  console.log(id);
  if (contact) {
    return res.status(200).json(contact)
  }
  res.status(404).json({ "message": "Not found" })
})

export default router