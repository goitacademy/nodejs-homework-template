import { updateContact } from '../../model/contacts'

const updateContactContr = async (req, res, next) => {
  const { id } = req.params
  const contact = await updateContact(id, req.body)
  if (contact) {
    return res.status(200).json(contact)
  }
  res.status(404).json({ message: 'Not found' })
}

export default updateContactContr
