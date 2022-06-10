const CreateError = require('http-errors')
const { Contact } = require('../model/contacts')

const getContacts = async (req, res) => {
  const { _id } = req.user
  const { favorite } = req.query
  const condition = { owner: _id }

  if (favorite !== undefined) {
    condition.favorite = favorite
  }

  const contacts = await Contact.find(
    condition,
    '_id name email phone favorite owner'
  ).populate('owner', '_id email')

  res.status(200).json(contacts)
}

const getContactFromId = async (req, res) => {
  const { contactId } = req.params
  const { _id: ownerId } = req.user
  const condition = { owner: ownerId, _id: contactId }
  const contact = await Contact.find(
    condition,
    '_id name email phone favorite owner'
  )
  if (!contact) {
    throw new CreateError(404, 'Not found')
  }
  res.status(200).json(contact)
}

const addContacts = async (req, res) => {
  const newContact = { ...req.body, owner: req.user._id }
  const contact = await Contact.create(newContact)
  res.status(201).json(contact)
}

const deleteContact = async (req, res) => {
  const { contactId } = req.params
  const { _id: ownerId } = req.user
  const condition = { owner: ownerId, _id: contactId }
  const contact = await Contact.findOneAndRemove(condition)
  if (!contact) {
    throw new CreateError(404, 'Not found')
  }
  res.status(200).json({ message: 'contact deleted' })
}

const changeContact = async (req, res) => {
  const { contactId } = req.params
  const { _id: ownerId } = req.user
  const condition = { owner: ownerId, _id: contactId }
  const contact = await Contact.findByIdAndUpdate(condition, req.body, {
    new: true,
  })
  if (!contact) {
    throw new CreateError(404, 'Not found')
  }
  res.status(200).json(contact)
}

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params
  const { _id: ownerId } = req.user
  const condition = { owner: ownerId, _id: contactId }

  const contact = await Contact.findByIdAndUpdate(
    condition,
    { favorite: req.body.favorite },
    {
      new: true,
    }
  )
  if (!contact) {
    throw new CreateError(404, 'Not found')
  }
  res.status(200).json(contact)
}

module.exports = {
  getContacts,
  getContactFromId,
  addContacts,
  deleteContact,
  changeContact,
  updateStatusContact,
}