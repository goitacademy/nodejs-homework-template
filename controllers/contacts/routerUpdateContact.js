import { Router } from 'express'
import { updateContact } from '../../model/contacts'
import {
  validationId,
  updateValidation,
} from '../../midllewares/validation/contactValidation'

const routerUpdateContact = new Router()
routerUpdateContact.patch(
  '/:id',
  validationId,
  updateValidation,
  async (req, res, next) => {
    const { id } = req.params
    const contact = await updateContact(id, req.body)
    if (contact) {
      return res.status(200).json(contact)
    }
    res.status(404).json({ message: 'Not found' })
  },
)
export default routerUpdateContact
