const uuid = require("uuid").v4;
const fs = require("fs").promises;

exports.listContacts = async (req, res) => {
  try {
    const contacts = JSON.parse(await fs.readFile("./models/contacts.json"));

    res.status(200).json({
      msg: "Success",
      contacts,
    });
  } catch (error) {
    console.log(error);

    res.sendStatus(500);
  }
};

exports.getContactById = (req, res) => {
  const { contact } = req;

  res.status(200).json({
    msg: "Success",
    contact,
  });
};

exports.addContact = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

exports.removeContact = async (req, res) => {
  try {
    const { contact } = req;

    // get all contacts from db
    // delete contact by id
    // // save contact data to DB
    res.sendStatus(204);
    // res.status(200).json({
    //   msg: "Success",
    // });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

exports.updateContact = async (req, res) => {
  try {
    const { contact } = req;
    const { name, email, phone } = req.body;
    // update contact data
    // get all contacts from db
    // overwrite contact with new data
    // // save contact data to DB
    res.status(202).json({
      msg: "Success",
      // contact: updateContact,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
