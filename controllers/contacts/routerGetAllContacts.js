import { Router } from 'express'
import { listContacts } from '../../model/contacts'
const routerGetAllContacts = new Router()

routerGetAllContacts.get('/', async (req, res, next) => {
  const contacts = await listContacts()
  res.status(200).json(contacts)
})

export default routerGetAllContacts
