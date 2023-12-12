const fs = require("fs").promises;
const uuid = require("uuid").v4;
const path = require("path");

const contactsPath = path.join(__dirname, "../models/contacts.json");

const { catchAsync, HttpError, contactsValidation } = require("../units");

exports.getAllContacts = catchAsync(async (req, res) => {
  const contactsDB = await fs.readFile(contactsPath);

  const contacts = JSON.parse(contactsDB);

  res.status(200).json(contacts);
});

exports.createContact = catchAsync(async (req, res) => {
  const { value, error } = contactsValidation.checkContact(req.body);
  if (error) {
    throw new HttpError(400, "missing required name field");
  }
  const { name, email, phone } = value;
  const newContact = {
    id: uuid(),
    name,
    email,
    phone,
  };

  const contactsDB = await fs.readFile(contactsPath);
  const contacts = JSON.parse(contactsDB);
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  res.status(201).json(newContact);
});

exports.getById = catchAsync(async (contactId) => {
// const { contactId } = req.params;
  const contactsDB = await fs.readFile(contactsPath);  
  const contacts = JSON.parse(contactsDB);

  const result = contacts.find((contact) => contact.id === contactId);

//   if (!result) {
//     throw new HttpError(404, "Not found");
//   }
     res.status(200).json({
       msg: "Success!",
       user: result,
     });

});
