const path = require("path");
const { nanoid } = require("nanoid");

const validationSchema = require("../schemas");
const helpers = require("./helpers");

const { Parcer, fileReader, fileWriter, handleContactUpdate } = helpers;
const { forPosting, forPuting } = validationSchema;

const contactsPath = path.resolve(__dirname, "../models/contacts.json");

const listContacts = async (req, res) => {
  const data = await fileReader(contactsPath);
  const parcedData = Parcer(data);
  res.json({
    status: 200,
    parcedData,
  });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const data = await fileReader(contactsPath);

  const contactFound = Parcer(data).find((item) => item.id === contactId);

  if (contactFound)
    res.json({
      status: 200,
      contactFound,
    });
  else
    res.status(404).json({
      status: 404,
      message: "Not found",
    });
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const data = await fileReader(contactsPath);

  const contactFound = Parcer(data).find((item) => item.id === contactId);

  if (contactFound) {
    const filteredArray = Parcer(data).filter((item) => item.id !== contactId);
    await fileWriter(contactsPath, JSON.stringify(filteredArray));
    res.json({
      status: 200,
      message: "contact deleted",
    });
  } else
    res.status(404).json({
      status: 404,
      message: "Not found",
    });
};

const addContact = async (req, res) => {
  const { error, value } = forPosting.validate(req.body);
  const data = await fileReader(contactsPath);

  if (error)
    res.status(400).json({
      status: 400,
      message: "missing required name field",
    });
  else {
    const newContact = {
      id: nanoid(),
      ...value,
    };
    const updatedArr = [...Parcer(data), newContact];
    await fileWriter(contactsPath, JSON.stringify(updatedArr));
    res.status(201).json({
      status: 201,
      newContact,
    });
  }
};

const updateContact = async (req, res) => {
  const { error, value } = forPuting.validate(req.body);

  if (error)
    res.status(400).json({
      status: 400,
      message: "missing fields",
    });
  else {
    const updatedContact = await handleContactUpdate(req, contactsPath, value);

    if (updatedContact)
      res.json({
        status: 200,
        updatedContact,
      });
    else
      res.status(404).json({
        status: 404,
        message: "Not found",
      });
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
