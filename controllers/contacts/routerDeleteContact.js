import { Router } from 'express'
import { removeContact } from '../../model/contacts'
import { validationId } from '../../midllewares/validation/contactValidation'
const routerDeleteContact = new Router()

// routerDeleteContact.delete('/:id', async (req, res, next) => {
routerDeleteContact.delete('/:id', validationId, async (req, res, next) => {
  const { id } = req.params
  const contact = await removeContact(id)
  if (contact) {
    return res.status(200).json({ message: 'Contact deleted' })
  }
  res.status(404).json({ message: 'Not found' })
})
export default routerDeleteContact
