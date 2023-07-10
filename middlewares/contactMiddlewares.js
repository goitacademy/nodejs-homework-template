const {readFile} = require('fs').promises
const path = require('path')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

const contactsPath = path.join('models', 'contacts.json')

exports.checkUserById = catchAsync(async (req, res, next) => {
    const { contactId } = req.params;
    
    const contacts = JSON.parse(await readFile(contactsPath));
  
    const contact = contacts.find((item) => item.id === contactId);
  
    if (!contact) return next(new AppError(404, 'Not found'));
  
    req.contact = contact;
  
    next();
  })