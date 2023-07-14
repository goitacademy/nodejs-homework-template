const uuid = require("uuid").v4;
const fs = require("fs").promises;

const { catchAsync } = require("../utils");

exports.listContacts = catchAsync(async (req, res) => {
  const contacts = JSON.parse(await fs.readFile("./models/contacts.json"));

  res.status(200).json({
    msg: "Success",
    contacts,
  });
});

exports.getContactById = catchAsync((req, res) => {
  const { contact } = req;

  res.status(200).json({
    msg: "Success",
    contact,
  });
});

exports.addContact = catchAsync(async (req, res) => {
  const { name, email, phone } = req.body;

  // validation

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

exports.removeContact = catchAsync(async (req, res) => {
  const { id } = req;

  await Contact.findByIdAndDelete(id);
  // get all contacts from db
  // delete contact by id
  // // save contact data to DB
  res.sendStatus(204);
  // res.status(200).json({
  //   msg: "Success",
  // });
});

exports.updateContact = catchAsync(async (req, res) => {
  const { id } = req;
  // const { name, email, phone } = req.body;

  const updatedUser = await Contact.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    },
    {
      new: true,
    }
  );

  // update contact data
  // get all contacts from db
  // overwrite contact with new data
  // // save contact data to DB
  res.status(202).json({
    msg: "Success",
    // contact: updateContact,
    contact: updatedUser,
  });
});
