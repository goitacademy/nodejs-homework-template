import { Router } from 'express'
import {
  validationId,
  validationUpdateMiddleWare,
} from '../../midllewares/validation/contactValidation'
import { updateContact } from '../../model/contacts'
const routerUpdateContact = new Router()
routerUpdateContact.patch(
  '/:id',
  validationId,
  validationUpdateMiddleWare,
  async (req, res, next) => {
    const { id } = req.params
    // if (!req.body) {
    //   res.status(400).json({ message: 'missing fields' })
    // }
    const contact = await updateContact(id, req.body)
    if (contact) {
      res.status(200).json(contact)
    }
    res.status(404).json({ message: 'Not found' })
  },
)
export default routerUpdateContact
