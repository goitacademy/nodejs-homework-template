const fs = require('fs').promises;
const { AppError, catchAsync} = require('../utils');
const { createContactValidator } = require('../utils/contactValidator');

exports.checkContactId = catchAsync (async (req, res, next) => {
      const { id } = req.params;
      const dataFromDB = await fs.readFile('./models/contacts.json');
      const contacts = JSON.parse(dataFromDB);
      const contact = contacts.find((item) => item.id === id);
      
      if(!contact) return next(new AppError(404, 'Not found'));
      req.contact = contact;
      next();
  });

  exports.checkContactData = (req, res, next) => {
      const { error, value } = createContactValidator(req.body);
      if (error) return next(new AppError(400, error.details[0].message));
      req.body = value;
    
      next();
    };

  