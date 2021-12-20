import { Router } from 'express'
import { validationId } from '../../midllewares/validation/contactValidation'
import { removeContact } from '../../model/contacts'
const routerDeleteContact = new Router()
routerDeleteContact.delete('/:id', validationId, async (req, res, next) => {
  const { id } = req.params
  const contact = await removeContact(id)
  if (contact) {
    res.status(200).json({ message: 'Contact deleted' })
  }
  res.status(404).json({ message: 'Not found' })
})
export default routerDeleteContact
