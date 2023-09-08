const { AppError, catchAsync, contactValidators } = require('../utils');

const contactService = require('../services/contactServices');

exports.checkContactId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  await contactService.contactExistsById(id);

  next();
});

exports.checkCreateContactData = catchAsync(async (req, res, next) => {
  const { error, value } = contactValidators.createContactDataValidator(req.body);

  if (error) {
    console.log(error);

    throw new AppError(400, 'Invalid contact data');
  }

  await contactService.contactExists({ phone: value.phone });

  req.body = value;

  next();
});

// const contacts = JSON.parse(await fs.readFile('models.json'));

// const contact = contacts.find((item) => item.id === id);

// if (!contact) throw new AppError(404, 'Contact does not exist..');

// req.contact = contact;

// next();
// });



exports.checkUpdateContactData = catchAsync(async (req, res, next) => {
  const { error, value } = contactValidators.checkUpdateContactData(req.body);
  if (error) {
    console.log(error);

    throw new AppError(400, 'Invalid Contact Data')
  }

  req.body = value;

  next();
});
