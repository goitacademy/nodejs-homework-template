import { Router } from 'express'
import { addContact } from '../../model/contacts'
import { validationMiddleWare } from '../../midllewares/validation/contactValidation'

const routerAddNewContact = new Router()
routerAddNewContact.post('/', validationMiddleWare, async (req, res, next) => {
  const contact = await addContact(req.body)
  res.status(200).json(contact)
})
export default routerAddNewContact
