const {readFile, writeFile} = require('fs/promises')
const path = require('path')
const uuid = require('uuid').v4
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const { createContactDataValidator } = require('../utils/contactValidator')

const contactsPath = path.join('models', 'contacts.json')

const listContacts = catchAsync(async (req, res) => {
  const contacts = JSON.parse(await readFile(contactsPath))

  res.status(200).json({contacts})
})

const getContactById = catchAsync(async (req, res) => {
  const {contact} = req

  res.status(200).json({contact})
})

const removeContact = catchAsync(async (req, res, next) => {
  const {contact} = req
  const contacts = JSON.parse(await readFile(contactsPath))

  const updatedContacts = contacts.filter((item) => item.id !== contact.id)

  await writeFile(contactsPath, JSON.stringify(updatedContacts))

  res.status(200).json({message: "contact deleted"})
})

const addContact = catchAsync(async (req, res, next) => {
  const { error, value } = createContactDataValidator(req.body)

  if (error) return next(new AppError(400, error.message))

  const contacts = JSON.parse(await readFile(contactsPath))

  const newContact = {
    ...value,
    id: uuid(),
  }

  contacts.push(newContact)

  await writeFile(contactsPath, JSON.stringify(contacts))

  res.status(201).json({contact: newContact})
})

const updateContact = catchAsync(async (req, res, next) => {
  if (!req.body) return next(new AppError(400, 'missing fields'))

  const {contact} = req

  const candidate = {
    ...contact,
    ...req.body,
  }

  const { error, value } = createContactDataValidator(candidate)

  if (error) return next(new AppError(400, error.message))

  const contacts = JSON.parse(await readFile(contactsPath))
  const updatedContacts = contacts.filter((item) => item.id !== contact.id)

  updatedContacts.push(value)

  await writeFile(contactsPath, JSON.stringify(updatedContacts))

  res.status(200).json({contact: value})
})

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
