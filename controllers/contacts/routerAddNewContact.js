import { Router } from 'express'
import { addContact } from '../../model/contacts'
import { addValidation } from '../../midllewares/validation/contactValidation'

const routerAddNewContact = new Router()
// routerAddNewContact.post('/', async (req, res, next) => {
routerAddNewContact.post('/', addValidation, async (req, res, next) => {
  const contact = await addContact(req.body)
  res.status(200).json(contact)
})
export default routerAddNewContact
