const mongoose = require('mongoose')

const { joiUserValidator } = require("../utils/joiValidator")
const  AppError  = require('../utils/appError')
const Contact = require('../models/contactModel')
const {catchAsync} = require('../utils/catchAsync')



exports.contactsValidator = catchAsync(async (req, res, next) => {

    const {error, value} = joiUserValidator(req.body)
    if (error) throw new AppError(400, 'Invalid user dataaa..');
    // if (error) return console.log("Некоретні дані")

    const contactExist = await Contact.exists({name: value.name})
    if(contactExist) throw new AppError(409, 'Contact with this name exists..');
    // if(contactExist) return console.log("Такий контакт вже існує");

    
    req.body = value;
    next();
})

exports.checkContactId = catchAsync(async (req, res, next) => {
    const {contactId} = req.params

    const invalidID = mongoose.Types.ObjectId.isValid(contactId)
    if (!invalidID) throw new AppError(404, 'Invalid id')

    const contactExist = Contact.exists({_id: contactId})
    if (!contactExist) throw new AppError(404, "Contact don't exist")

    next()
})

