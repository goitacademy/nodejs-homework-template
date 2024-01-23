import { updateContact } from '#models/contacts.js'
import { schema } from '#schemas/contacts.js'

export async function updateContacts(req, res, next) {
  try {
    const { contactId } = req.params

    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
      res.status(400).json({
        message: `missing required field`,
        error: validationResult.error,
      })
      return
    }

    const contactToUpdate = await updateContact(contactId, req.body)

    contactToUpdate
      ? res.status(200).json({ contactToUpdate })
      : res.status(404).json({ message: 'Not found' })
  } catch (error) {
    next(error)
    return res.status(500).json({ message: 'Server error' })
  }
}