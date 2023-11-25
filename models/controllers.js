const path = require("path");
const { nanoid } = require("nanoid");
const fs = require("fs/promises");
const validationSchema = require("../validation/schemas");

const contactsPath = path.resolve(__dirname, "contacts.json");

const { readFile, writeFile } = fs;
const { forPosting, forPuting } = validationSchema;

// Helpers **
function Parcer(data) {
  try {
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
}

async function fileReader(path) {
  const data = await readFile(path).catch((e) => console.log(e.message));
  return data;
}
async function fileWriter(path, payload) {
  const data = await writeFile(path, payload).catch((e) =>
    console.log(e.message)
  );
  return data;
}

async function handleContactUpdate(req, newData) {
  const { contactId } = req.params;

  const data = await fileReader(contactsPath);
  const contactFound = Parcer(data).find((item) => item.id === contactId);

  if (!contactFound) return null;

  const filteredArr = Parcer(data).filter((item) => item.id !== contactId);

  const updatedContact = {
    ...contactFound,
    ...newData,
  };

  const updatedArr = [...filteredArr, updatedContact];

  await fileWriter(contactsPath, JSON.stringify(updatedArr));

  return updatedContact;
}

// main controllers ***
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
    const updatedContact = await handleContactUpdate(req, value);

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
