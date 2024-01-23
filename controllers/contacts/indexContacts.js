import { listContacts } from '#models/contacts.js'

export async function indexContacts(req, res, next) {
  try {
    const result = await listContacts()
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}