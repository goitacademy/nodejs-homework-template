const fs = require("fs").promises;
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

//

const getContactById = async (contactId) => {
  const contacts = await fs.readFile(filePath, "utf8", (err, data) => {
    if (err) throw err;
    return data;
  });
  const parsedContacts = JSON.parse(contacts);
  if (parsedContacts.find(({ id }) => id === contactId) !== undefined) {
    const contact = parsedContacts.find((e) => e.id === contactId);
    return {
      status: "success",
      code: 200,
      data: contact,
    };
  } else {
    return {
      status: "error",
      code: 404,
      message: "Not found",
    };
  }
};

//

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
      message: "Not found",
    };
  }
};

//

const addContact = async (body) => {
  const contacts = await fs.readFile(filePath, "utf8", (err, data) => {
    if (err) throw err;
    return data;
  });
  const parsedContacts = JSON.parse(contacts);
  if (Object.entries(body).length < 3) {
    return {
      status: "error",
      code: 400,
      message: "Missing fields",
    };
  } else {
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
    return {
      status: "success",
      code: 201,
      message: "Contact added",
      data: newContact,
    };
  }
};

//

const updateContact = async (contactId, body) => {
  const contacts = await fs.readFile(
    "./models/contacts.json",
    "utf8",
    (err, data) => {
      if (err) throw err;
      return data;
    }
  );
  const parsedContacts = JSON.parse(contacts);
  console.log(Object.entries(body).length);
  if (Object.entries(body).length === 0) {
    return {
      status: "error",
      code: 400,
      message: "Missing fields",
    };
  } else if (parsedContacts.find(({ id }) => id === contactId) !== undefined) {
    const { name, email, phone } = body;
    const [updatedContact] = parsedContacts.filter(
      ({ id }) => id === contactId
    );

    updatedContact.name = name !== undefined ? name : updatedContact.name;
    updatedContact.email = email !== undefined ? email : updatedContact.email;
    updatedContact.phone = phone !== undefined ? phone : updatedContact.phone;

    const newContacts = [...parsedContacts];
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
      message: "Contact updated",
      data: updatedContact,
    };
  } else {
    return {
      status: "error",
      code: 404,
      message: "Not found",
    };
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
