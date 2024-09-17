const uuid = require('uuid').v4;
const fs = require('fs').promises;

const { AppError, catchAsync, contactValidators } = require('../utils');

exports.createContact = catchAsync(async (req, res) => {

  const { error, value } = contactValidators.createContactDataValidator(req.body);

  if (error) throw new AppError(400, 'Invalid contact data..');

  const { name, email, phone } = value;

  // create new Contact object
  const newContact = {
    name,
    email,
    phone,
    id: uuid(),
  };

  // save contact data to DB (TEMPORARY SOLUTION!!)
  const contactsDB = await fs.readFile('models.json');

  const contacts = JSON.parse(contactsDB);

  users.push(newContact);

  await fs.writeFile('contacts.json', JSON.stringify(contacts));

  // send respons to the FE
  res.status(201).json({
    msg: 'Success',
    contact: newContact,
  });
});

exports.getAllContacts = catchAsync(async (req, res) => {
  const contacts = JSON.parse(await fs.readFile('contacts.json'));

  res.status(200).json({
    msg: 'Success',
    contacts,
  });
});

exports.getOneContact = (req, res) => {
  const { contact } = req;

  res.status(200).json({
    msg: 'Success',
    contact,
  });
};

exports.updateContact = catchAsync((req, res) => {
  const { contact } = req;
  const { name, email, phone } = req.body;

  // update contact data
  // get all contacts from db
  // overwrite contact with new data

  res.status(200).json({
    msg: 'Success',
    // contact: updatedContact
  });
});

exports.deleteContact = catchAsync((req, res) => {
  const { contact } = req;

  // get all contacts from db
  // delete contact by id

  res.sendStatus(204);
  // res.status(200).json({
  //   msg: 'Success',
  // });
});