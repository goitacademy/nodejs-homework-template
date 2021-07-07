const {
  getContacts,
  getContactById,
  addContact,
  changeContactById,
  deleteContact,
  updateStatusContact,
  getFavoriteContacts,
} = require('../services/contactsService')

const getContactsController = async (req, res) => {
  const { _id } = req.user
  const { favorite } = req.query

  let page = 0
  let limit = 10
  if (favorite) {
    const favoriteContacts = await getFavoriteContacts(_id, favorite)
    res.json({ status: 'success', favoriteContacts })
    return
  }
  if (req.query.limit) {
    page = +req.query.page
    limit = +req.query.limit
  }

  const contacts = await getContacts(_id, page, limit)

  res.json({ contacts })
}

const getContactByIdController = async (req, res) => {
  const { contactId } = req.params
  const { _id: owner } = req.user

  const contact = await getContactById(contactId, owner)

  res.json({ contact, status: 'success' })
}

const addContactController = async (req, res) => {
  const { body } = req
  const { _id: owner } = req.user

  const contact = await addContact({ body }, owner)

  res.json({ contact, status: 'success' })
}

const changeContactController = async (req, res) => {
  const { body } = req
  const { contactId } = req.params
  const { _id: owner } = req.user

  if (!req.body) {
    res.status(400).json({ message: 'missing fields' })
  }
  const contact = await changeContactById(
    contactId,
    {
      body,
    },
    owner,
  )
  if (!contact) {
    res.status(404).json({ message: 'Not found' })
  }

  res.json({ contact, status: 'success' })
}

const updateStatusContactController = async (req, res) => {
  const { favorite } = req.body
  const { contactId } = req.params
  const { _id: owner } = req.user

  const contact = await updateStatusContact(contactId, favorite, owner)
  res.json({ contact, status: 'success' })
}

const deleteContactController = async (req, res) => {
  const { contactId } = req.params
  const { _id: owner } = req.user

  const result = await deleteContact(contactId, owner)

  res.json({ result, status: 'success' })
}

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  changeContactController,
  updateStatusContactController,
  deleteContactController,
}
