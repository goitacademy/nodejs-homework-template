
const { catchAsync, contactsValidators, AppError } = require("../utils");

exports.addContact = catchAsync(async (req, res) => {
  const { error, value } = contactsValidators.createContactDataValidator(
    req.body
  );
  console.log(error, value);
  if (error) throw new AppError(400, "Invalid contact data..");

  const { name, email, phone } = value;

  

  

  // send respons to the FE
  res.status(201).json({
    msg: "Contact created!",
    contact: newContact,
  });
});

exports.listContacts = catchAsync(async (req, res) => {
  

  res.status(200).json({
    msg: "Success",
    contacts,
  });
});

exports.getContactById = catchAsync(async (req, res) => {
  const { contact } = req;

  res.status(200).json({
    msg: "Success",
    contact,
  });
});

exports.updateContact = catchAsync(async (req, res) => {
  const { contact } = req;
  const { name, email, phone } = req.body;



 
  res.status(200).json({
    msg: "Contact updated!",
    contact,
  });
});

exports.removeContact = catchAsync(async (req, res) => {
  const { contact } = req;

  
  // res.sendStatus(204);
  res.status(200).json({
    msg: "Contact delete!",
  });
});
