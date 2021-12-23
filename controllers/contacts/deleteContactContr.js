import { removeContact } from '../../model/contacts'

const deleteContactContr = async (req, res, next) => {
  const { id } = req.params
  const contact = await removeContact(id)
  if (contact) {
    return res.status(200).json({ message: 'Contact deleted' })
  }
  res.status(404).json({ message: 'Not found' })
}
export default deleteContactContr
