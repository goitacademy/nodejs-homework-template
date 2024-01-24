import { Contact } from '#schemas/contact.js'

export async function showContacts(req, res, next) {
  try {
    const { contactId } = req.params
    const searchedContact = await Contact.findOne({_id: contactId})
    searchedContact
      ? res.status(200).json({ searchedContact })
      : res.status(404).json({
          message: `Not found contact with ID: ${contactId}`,
        })
  } catch (error) {
    next(error)
  }
}