const fs = require("fs/promises");
// const { json } = require("express");
const path = require("path");
const { nanoid } = require("nanoid");
const filePath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(filePath, "utf8", (err, data) => {
    if (err) throw err;
    return data;
  });

  const parsedContacts = JSON.parse(contacts);
  return {
    status: "success",
    code: 200,
    data: parsedContacts,
  };
};

const getContactById = async (contactId) => {
  const contacts = await fs.readFile(filePath, "utf8", (err, data) => {
    if (err) throw err;
    console.log(contactId);
    return data;
  });

  const parsedContact = JSON.parse(contacts).find((e) => e.id === contactId);
  console.log(parsedContact);

  if (parsedContact === undefined) {
    return {
      status: "error",
      code: 404,
      message: "Contact not found",
    };
  } else {
    return {
      status: "success",
      code: 200,
      data: parsedContact,
    };
  }
};

const removeContact = async (contactId) => {
  const contacts = await fs.readFile(filePath, "utf8", (err, data) => {
    if (err) throw err;
    return data;
  });
  const parsedContacts = JSON.parse(contacts);

  if (parsedContacts.find(({ id }) => id === contactId) !== undefined) {
    const newContacts = parsedContacts.filter(({ id }) => id !== contactId);
    fs.writeFile(
      filePath,
      JSON.stringify(newContacts, null, "\t"),
      "utf8",
      (err) => {
        if (err) throw err;
      }
    );
    return {
      status: "success",
      code: 200,
      message: "Contact deleted",
    };
  } else {
    return {
      status: "error",
      code: 404,
      message: "Contact not found",
    };
  }
};

const addContact = async (body) => {
  const contacts = await fs.readFile(filePath, "utf8", (err, data) => {
    if (err) throw err;
    return data;
  });
  const parsedContacts = JSON.parse(contacts);

  const { name, email, phone } = body;

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  const newContacts = [...parsedContacts, newContact];
  fs.writeFile(
    filePath,
    JSON.stringify(newContacts, null, "\t"),
    "utf8",
    (err) => {
      if (err) throw err;
    }
  );
  // return newContact;
  return {
    status: "success",
    code: 201,
    data: newContact,
  };
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
