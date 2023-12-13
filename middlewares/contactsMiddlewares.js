const { getContacts } = require('../models');
const { catchAsync } = require('../utils');

exports.checkBody = (req, res, next) => {
  const bodyKeys = Object.keys(req.body);
  if (bodyKeys.length < 1) {
    res.status(400).json({ message: 'missing body' });
    return;
  }
  const check = bodyKeys.map((item) => {
    if (item === 'name' || item === 'email' || item === 'phone') return true;
    return false;
  });
  if (check.includes(false)) {
    res.status(400).json({ message: 'vrong fields' });
    return;
  }
  next();
};

exports.checkId = catchAsync(async (req, res, next) => {
  const id = req.params.contactId;
  const contacts = await getContacts();
  const [contact] = contacts.filter((item) => item.id === id);

  if (!contact) {
    res.status(404).json({ message: `Contact ID: ${id} Not found` });
    return;
  }
  req.contact = contact;
  next();
});
