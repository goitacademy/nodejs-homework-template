const { AppError, catchAsync, contactValidator} = require('../../utils');
const { Contact } = require('../../models');

const checkCreateContactData = catchAsync (async (req, res, next) => {
    const { error, value } = contactValidator.createContactValidator(req.body);

    if (error) return next(new AppError(400, error.details.map(item => item.message)));

    const emailExists = await Contact.exists({ email: value.email });
    if(emailExists) return next(new AppError(409, 'Contact with this email already exists'));

    const phoneExists = await Contact.exists({ phone: value.phone });
    if(phoneExists) return next(new AppError(409, 'Contact with this phone number already exists'));

    req.body = value;
    
      next();
});

module.exports = checkCreateContactData;