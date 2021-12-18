import { Router } from 'express'
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} from '../../model/controllers/index'
import {
  validationMiddleWare,
  validationUpdateMiddleWare,
  validationId,
} from './validation'
const router = new Router()

router.get('/', async (req, res, next) => {
  const contacts = await listContacts()
  res.status(200).json(contacts)
})

router.get('/:id', validationId, async (req, res, next) => {
  const { id } = req.params
  const contact = await getContactById(id)
  if (contact) {
    res.status(200).json(contact)
  }
  res.status(404).json({ message: `Contact by id ${id} not found` })
})

router.post('/', validationMiddleWare, async (req, res, next) => {
  const contact = await addContact(req.body)
  res.status(200).json(contact)
})

router.delete('/:id', validationId, async (req, res, next) => {
  const { id } = req.params
  const contact = await removeContact(id)
  if (contact) {
    res.status(200).json({ message: 'Contact deleted' })
  }
  res.status(404).json({ message: 'Not found' })
})

router.patch(
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

export default router
