const { Contact } = require('../db/contactModel')
const { WrongParametersError } = require('../helpers/errors')

const getContacts = async (owner, page, limit) => {
  const contacts = await Contact.find({ owner }, { __v: 0, owner: 0 })
    .skip(page * limit)
    .limit(limit)
  return contacts
}

const getFavoriteContacts = async (owner, favorite) => {
  const contacts = await Contact.find({ owner, favorite }, { __v: 0, owner: 0 })
  return contacts
}

const getContactById = async (contactId, owner) => {
  const contact = await Contact.findOne(
    { _id: contactId, owner },
    { __v: 0, owner: 0, _id: 0 },
  )
  if (!contact) {
    throw new WrongParametersError(
      `Failure, no posts with id '${contactId}' found!`,
    )
  }
  return contact
}

const addContact = async ({ body }, owner) => {
  const newContact = new Contact({ ...body, owner })
  await newContact.save()
  const { id } = newContact
  const contact = await Contact.find({ _id: id }, { __v: 0, owner: 0 })
  return contact
}

const changeContactById = async (contactId, { body }, owner) => {
  if (!body) {
    console.log('Missing fields')
    return
  }
  await Contact.findOneAndUpdate({ _id: contactId, owner }, { ...body })
  const updatedContact = await getContactById(contactId, owner)
  return updatedContact
}

const updateStatusContact = async (contactId, favorite, owner) => {
  await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    { $set: { favorite } },
  )
  const newContact = await getContactById(contactId, owner)
  return newContact
}

const deleteContact = async (contactId, owner) => {
  const contact = await Contact.findOneAndDelete({ _id: contactId, owner })
  if (!contact) {
    return { messsage: `No contact with id: ${contactId} found` }
  }
}

module.exports = {
  getContacts,
  getContactById,
  addContact,
  changeContactById,
  deleteContact,
  updateStatusContact,
  getFavoriteContacts
}
