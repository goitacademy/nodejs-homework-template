import { ctrlWrapper } from "../decorators/index.js"
import { HttpError } from "../helpers/index.js"
import contacts from "../models/contacts.js"

const getAllContacts = async (req, res, next) => {
  const contactList = await contacts.listContacts()
  if (!contactList) throw HttpError(404, 'Not found')

  res.json({
    status: "OK",
    code: 200,
    data: contactList,
  })
}

const getContactsById = async (req, res, next) => {
    const contactId = req.params.contactId
    const currentContact = await contacts.getContactById(contactId)

    if (!currentContact) throw HttpError(404, 'Not found')

    res.json({
      status: "OK",
      code: 200,
      data: currentContact,
    })
}

const deleteContactsById = async (req, res, next) => {
    const contactId = req.params.contactId
    const currentContact = await contacts.removeContact(contactId)

    if (!currentContact) throw HttpError(404, 'Not found')

    res.json({
      status: "OK",
      code: 200,
      data: currentContact,
    })
}

const createContact = async (req, res, next) => {
    const { name, email, phone } = req.body

    const currentContact = await contacts.addContact({ name, email, phone })
    if (!currentContact) throw HttpError(404, 'Not found')

    res.json({
      status: "Created",
      code: 201,
      data: currentContact,
    })
}

const updateContact = async (req, res, next) => {
    const { contactId } = req.params
    const { name, email, phone } = req.body

    const currentContact = await contacts.updateContact(contactId, { name, email, phone })
    if (!currentContact) throw HttpError(404, 'Not found')

    res.json({
      status: "OK",
      code: 200,
      data: currentContact,
    })
}

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactsById: ctrlWrapper(getContactsById),
  deleteContactsById: ctrlWrapper(deleteContactsById), 
  createContact: ctrlWrapper(createContact), 
  updateContact: ctrlWrapper(updateContact), 
}