const path = require("path");
const { nanoid } = require("nanoid");
const fs = require("fs/promises");
const validationSchema = require("../validation/schemas");

const contactsPath = path.resolve(__dirname, "contacts.json");

const { readFile, writeFile } = fs;

function Parcer(data) {
  try {
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
}

async function fileReader(path) {
  await readFile(path).catch((e) => console.log(e.message));
}
async function fileWriter(path, payload) {
  await writeFile(path, payload).catch((e) => console.log(e.message));
}

const listContacts = (req, res) => {
  res.json({
    status: 200,
    data: Parcer(fileReader(contactsPath)),
  });
};

const getContactById = (req, res) => {
  const { contactId } = req.params;
  const data = fileReader(contactsPath);

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

const removeContact = (req, res) => {
  const { contactId } = req.params;
  const data = fileReader(contactsPath);

  const contactFound = Parcer(data).find((item) => item.id === contactId);

  if (contactFound) {
    const filteredArray = Parcer(data).filter((item) => item.id !== contactId);
    fileWriter(contactsPath, JSON.stringify(filteredArray));
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

const addContact = (req, res) => {
  const { error, value } = validationSchema.forPosting.validate(req.body);
  const data = fileReader(contactsPath);

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
    fileWriter(contactsPath, JSON.stringify(updatedArr));
    res.status(201).json({
      status: 201,
      newContact,
    });
  }
};

const updateContact = (req, res) => {
  const { error, value } = validationSchema.forPuting.validate(req.body);
  const { contactId } = req.params;

  const data = fileReader(contactsPath);
  const contactFound = Parcer(data).find((item) => item.id === contactId);

  if (error)
    res.status(400).json({
      status: 400,
      message: "missing fields",
    });
  else if (!contactFound)
    res.status(404).json({
      status: 404,
      message: "Not found",
    });
  else {
    const filteredArr = Parcer(data).filter((item) => item.id !== contactId);

    const updatedContact = {
      ...contactFound,
      ...value,
    };

    const updatedArr = [...filteredArr, updatedContact];

    fileWriter(contactsPath, JSON.stringify(updatedArr));
    res.json({
      status: 200,
      updatedContact,
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
