const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const Contact = require('../models/contactModel')

const listContacts = catchAsync(async (req, res) => {
  const contacts = await Contact.find()

  res.status(200).json({contacts})
})

const getContactById = catchAsync(async (req, res) => {
  const {contact} = req

  res.status(200).json({contact})
})

const removeContact = catchAsync(async (req, res) => {
  const {contact} = req
  
  await Contact.findByIdAndDelete(contact.contactId)

  res.status(200).json({message: "contact deleted"})
})

const addContact = catchAsync(async (req, res) => {
  const newContact = await Contact.create(req.body)

  res.status(201).json({contact: newContact})
})

const updateContact = catchAsync(async (req, res, next) => {
  if (!req.body) return next(new AppError(400, 'missing fields'))

  const { contactId } = req.params

  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    {
      name: req.body.name || req.contact.name,
      email: req.body.email || req.contact.email,
      phone: req.body.phone || req.contact.phone,
    },
    {
      new: true,
    }
  )

  res.status(200).json({contact: updatedContact})
})

const updateStatusContact = catchAsync(async (req, res, next) => {
  if (!req.body) return next(new AppError(400, 'missing field favorite'))

  const { contactId } = req.params

  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    {
      favorite: req.body.favorite,
    },
    {
      new: true,
    }
  )

  res.status(200).json({contact: updatedContact})
})

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}
