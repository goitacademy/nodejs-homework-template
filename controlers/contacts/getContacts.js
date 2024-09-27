const { catchAsync } = require("../../utils");


const getAllContacts = catchAsync(async (req, res) => {
  // const contacts = await Contact.find();
  const contacts = await contactServise.getAllContacts();

  res.status(200).json({
    msg: 'Success',
    contacts,
  });
});

module.exports = getAllContacts;

const getOneContact = catchAsync(async (req, res) => {
  const contact = await contactService.getContactById(req.params.id);

  res.status(200).json({
    msg: 'Success',
    contact,
  });
});

module.exports = getOneContact;