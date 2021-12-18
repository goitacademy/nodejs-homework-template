import {Router} from 'express'
// import model from '../../model/index'
import operations from '../../model/controllers/operations'
import { validateCreate, validateUpdate, validateId } from './validation'
const router = new Router()

router.get('/', async (req, res, next) => {
  const contacts = await operations.listContacts()
  res.status(200).json(contacts)
})

router.get('/:id', validateId, async (req, res, next) => {
  const {id} = req.params
  const contact = await operations.getContactById(id)
  if (contact){
    return res.status(200).json(contact)
  }
  res.status(404).json({message: 'Not found'})
})

router.post('/', validateCreate, async (req, res, next) => {
  const newContact = await operations.addContact(req.body)
  res.status(201).json(newContact)
})

router.delete('/:id', validateId, async (req, res, next) => {
  const {id} = req.params
  const contact = await operations.removeContact(id)
  if (contact){
    return res.status(200).json({message: 'contact deleted'})
  }
  res.status(404).json({message: 'Not found'})
})

router.put('/:id', validateId, validateUpdate, async (req, res, next) => {
  const {id} = req.params
  const contact = await operations.updateContact(id, req.body)
  if (contact){
    return res.status(200).json(contact)
  }
  res.status(404).json({message: 'Not found'})
})

export default router
