import repositoryContacts from '../../repository/contacts'
import { HttpCode } from '../../lib/constants'

const getContacts = async (req, res, next) => {
  const { id: userId } = req.user
  const contacts = await repositoryContacts.listContacts(userId, req.query)
  res
    .status(HttpCode.OK)
    .json({ status: 'success', code: HttpCode.OK, data: { ...contacts } })
}

const getContactById = async (req, res, next) => {
  const { id } = req.params
  const { id: userId } = req.user
  const contact = await repositoryContacts.getContactById(userId, id)
  console.log(contact) // toObject
  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: 'success', code: HttpCode.OK, data: { contact } }) // toJson
  }
  res
    .status(HttpCode.NOT_FOUND)
    .json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found' })
}

const addContact = async (req, res, next) => {
  const { id: userId } = req.user
  const newContact = await repositoryContacts.addContact(userId, req.body)
  res.status(HttpCode.CREATED).json({
    status: 'success',
    code: HttpCode.OK,
    data: { contact: newContact },
  })
}

const removeContact = async (req, res, next) => {
  const { id } = req.params
  const { id: userId } = req.user
  const contact = await repositoryContacts.removeContact(userId, id)
  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: 'success', code: HttpCode.OK, data: { contact } })
  }
  res
    .status(HttpCode.NOT_FOUND)
    .json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found' })
}

const updateContact = async (req, res, next) => {
  const { id } = req.params
  const { id: userId } = req.user
  const contact = await repositoryContacts.updateContact(userId, id, req.body)
  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: 'success', code: HttpCode.OK, data: { contact } })
  }
  res
    .status(HttpCode.NOT_FOUND)
    .json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found' })
}

export { getContacts, getContactById, addContact, removeContact, updateContact }
