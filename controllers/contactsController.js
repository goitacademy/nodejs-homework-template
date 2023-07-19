const uuid = require("uuid").v4;
const fs = require("fs").promises;

const { catchAsync, contactsValidators, AppError } = require("../utils");

exports.addContact = catchAsync(async (req, res) => {
  const { error, value } = contactsValidators.createContactDataValidator(
    req.body
  );
  console.log(error, value);
  if (error) throw new AppError(400, "Invalid contact data..");

  const { name, email, phone } = value;

  // create new Contact object
  const newContact = {
    id: uuid(),
    name,
    email,
    phone,
  };
  // save contact data to DB
  const contactDB = await fs.readFile("./models/contacts.json");

  const contacts = JSON.parse(contactDB);
  contacts.push(newContact);

  await fs.writeFile("./models/contacts.json", JSON.stringify(contacts));

  // send respons to the FE
  res.status(201).json({
    msg: "Contact created!",
    contact: newContact,
  });
});

exports.listContacts = catchAsync(async (req, res) => {
  const contacts = JSON.parse(await fs.readFile("./models/contacts.json"));

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

  // update contact data
  contact.name = name;
  contact.email = email;
  contact.phone = phone;

  // get all contacts from db
  const contactsDB = await fs.readFile("./models/contacts.json");
  const contacts = JSON.parse(contactsDB);

  // overwrite contact with new data
  const contactIndex = contacts.findIndex((item) => item.id === contact.id);

  // // save contact data to DB
  contacts[contactIndex] = contact;
  await fs.writeFile("./models/contacts.json", JSON.stringify(contacts));

  res.status(200).json({
    msg: "Contact updated!",
    contact,
  });
});

exports.removeContact = catchAsync(async (req, res) => {
  const { contact } = req;

  // get all contacts from db
  const contactsDB = await fs.readFile("./models/contacts.json");
  const contacts = JSON.parse(contactsDB);

  // delete contact by id
  const contactIndex = contacts.findIndex((item) => item.id === contact.id);
  contacts.splice(contactIndex, 1);

  // save contact data to DB
  await fs.writeFile("./models/contacts.json", JSON.stringify(contacts));

  // res.sendStatus(204);
  res.status(200).json({
    msg: "Contact delete!",
  });
});
