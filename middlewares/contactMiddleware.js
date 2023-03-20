const  { Types } = require('mongoose');
const { AppError, catchAsync, contactValidator} = require('../utils');
const Contact = require('../models/contactModel');


exports.checkContactId = catchAsync (async (req, res, next) => {
      const { id } = req.params;

      const idIsValid = Types.ObjectId.isValid(id);
      if(!idIsValid) return next (new AppError(404, 'Contact does not exist'));

      const contactExists = await Contact.exists({ _id: id });
      if(!contactExists) return next(new AppError(404, 'Contact does not exist'));

      next();
  });


  exports.checkCreateContactData = catchAsync (async (req, res, next) => {
    const { error, value } = contactValidator.createContactValidator(req.body);

    if (error) return next(new AppError(400, error.details.map(item => item.message)));

    const emailExists = await Contact.exists({ email: value.email });
    if(emailExists) return next(new AppError(409, 'Contact with this email already exists'));

    const phoneExists = await Contact.exists({ phone: value.phone });
    if(phoneExists) return next(new AppError(409, 'Contact with this phone number already exists'));

    req.body = value;
    
      next();
});

exports.checkUpdateContactData = catchAsync (async (req, res, next) => {
  const { error, value } = contactValidator.updateContactValidator(req.body);

  if (error) return next(new AppError(400, error.details.map(item => item.message)));

  req.body = value;
  
    next();
});

exports.checkFavoriteContactData = catchAsync (async (req, res, next) => {
  if (!Object.keys(req.body).includes('favorite')) 
    return next(new AppError(400, 'missing field favorite'));

    next();
});