import {Router} from 'express'
import model from '../../model/index'
import { validateAddContact, validateUpdateContact, validateId } from './validation'

const router = new Router()

router.get('/', async (req, res, next) => {
  const contacts = await model.listContacts()
  res.status(200).json(contacts)
})

router.get('/:id', validateId, async (req, res, next) => {
  const {id} = req.params
  const contact = await model.getContactById(id)
  if (contact){
   return res.status(200).json(contact)
  }
  res.status(404).json({ message: "Not found" })
})

router.post('/', validateAddContact, async (req, res, next) => {
  const newContact = await model.addContact(req.body)
  res.status(201).json(newContact)
})

router.delete('/:id', validateId, async (req, res, next) => {
  const {id} = req.params
  const removedContact = await model.removeContact(id)
  if(removedContact){
   return res.status(200).json({ message: "contact deleted" })
  }
   res.status(404).json({ message: "Not found" })
})

router.put('/:id', validateUpdateContact, async (req, res, next) => {
  const {id} = req.params
  const updatedContact = await model.updateContact(id, req.body)
  if(updatedContact){
   return res.status(200).json(updatedContact)
  }
   res.status(404).json({ message: "Not found" })
})

export default router
