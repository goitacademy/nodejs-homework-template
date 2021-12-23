import { addContact } from '../../model/contacts'

const addNewContactContr = async (req, res, next) => {
  const contact = await addContact(req.body)
  res.status(200).json(contact)
}
export default addNewContactContr
