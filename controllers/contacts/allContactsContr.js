import { listContacts } from '../../model/contacts'

const allContactsContr = async (req, res, next) => {
  const contacts = await listContacts()
  res.status(200).json(contacts)
}

export default allContactsContr
