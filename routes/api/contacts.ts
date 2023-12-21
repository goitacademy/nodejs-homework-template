import { Router } from 'express'
import createHttpError from 'http-errors'
import { addContact, getContactById, listContacts, removeContact, updateContact } from 'models/contacts'
import { contactsSchema } from 'schemas/contactsSchema'

export const contactsRouter = Router()

contactsRouter.get('/', async (_, res, next) => {
  try {
    const contacts = await listContacts()
    res.json(contacts)
  } catch (error) {
    next(error)
  }
})

contactsRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params
  const contact = await getContactById(id)
  if (!contact) {
    return next(createHttpError(404, `Movie with id=${id} not found`))
  }
  res.json(contact)
})

contactsRouter.post('/', async (req, res, next) => {
  const parsedData = contactsSchema.safeParse(req.body)
  if (!parsedData.success) {
    return next(createHttpError(400, 'Bad request'))
  }
  const contact = await addContact(parsedData.data)
  res.status(201).json(contact)
})

contactsRouter.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  const contact = await removeContact(id)
  if (!contact) {
    return next(createHttpError(404, `Movie with id=${id} not found`))
  }
  res.json({ message: 'Deleted successfully' })
})

contactsRouter.put('/:id', async (req, res, next) => {
  const parsedData = contactsSchema.safeParse(req.body)
  if (!parsedData.success) {
    return next(createHttpError(400, 'Bad request'))
  }
  const { id } = req.params
  const contact = await updateContact(id, req.body)
  if (!contact) {
    return next(createHttpError(404, `Movie with id=${id} not found`))
  }
  res.json(contact)
})
