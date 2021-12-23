import { Router } from 'express'
import { getContactById } from '../../model/contacts'
import {
  validationId,
  updateValidation,
} from '../../midllewares/validation/contactValidation'

const routerGetContactById = new Router()
routerGetContactById.get(
  '/:id',
  validationId,
  updateValidation,
  async (req, res, next) => {
    const { id } = req.params
    const contact = await getContactById(id)
    if (contact) {
      return res.status(200).json(contact)
    }
    res.status(404).json({ message: `Contact by id ${id} not found` })
  },
)
export default routerGetContactById
