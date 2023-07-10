const { Types } = require('mongoose')

const Contact = require('../models/contactModel')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const { createContactDataValidator } = require('../utils/contactValidator')

exports.checkContactById = catchAsync(async (req, res, next) => {
    const { contactId } = req.params

    const contactIdIsValid = Types.ObjectId.isValid(contactId)

    if (!contactIdIsValid) return next(new AppError(400, 'Bad request'))
      
    const contact = await Contact.findById(contactId)
  
    if (!contact) return next(new AppError(404, 'Not found'))
  
    req.contact = contact
  
    next()
  })

  exports.checkCreateContactData = catchAsync(async (req, res, next) => {
    const { error, value } = createContactDataValidator(req.body)
  
    if (error) return next(new AppError(400, 'Invalid contact data'))
  
    const emailExists = await Contact.exists({ email: value.email })
  
    if (emailExists) return next(new AppError(400, 'Contact with this email already exists'))

    const phoneExists = await Contact.exists({ phone: value.phone })
  
    if (phoneExists) return next(new AppError(400, 'Contact with this phone already exists'))
  
    req.body = value
  
    next()
  })