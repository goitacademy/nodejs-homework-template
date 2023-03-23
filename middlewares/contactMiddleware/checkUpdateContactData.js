const { AppError, catchAsync, contactValidator} = require('../../utils');

const checkUpdateContactData = catchAsync (async (req, res, next) => {
    const { error, value } = contactValidator.updateContactValidator(req.body);
  
    if (error) return next(new AppError(400, error.details.map(item => item.message)));
  
    req.body = value;
    
      next();
  });

  module.exports = checkUpdateContactData;