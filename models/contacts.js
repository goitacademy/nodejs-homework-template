const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    const data = {
      data: JSON.parse(contacts.toString()),
      status: "success",
      code: 200,
    };
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await fs.readFile(contactsPath);
    const data = JSON.parse(contacts.toString()).find(
      (contact) => contact.id === contactId,
    );
    const result = (data) => {
      if (data) {
        return { data: data, status: "success", code: 200 };
      } else {
        return { message: "Not found", status: "error", code: 404 };
      }
    };
    return result(data);
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  let length = 0;
  try {
    const contactsBeforeDel = await fs.readFile(contactsPath);
    const dataBefore = contactsBeforeDel.toString();
    length = JSON.parse(dataBefore).length;

    await fs.writeFile(
      contactsPath,
      JSON.stringify(
        JSON.parse(dataBefore).filter((contact) => contact.id !== contactId),
      ),
    );

    const contactsAfterDel = await fs.readFile(contactsPath);
    const dataAfter = contactsAfterDel.toString();

    const result = () => {
      return JSON.parse(dataAfter).length === length
        ? { message: "Not found", status: "error", code: 404 }
        : { message: "contact deleted", status: "success", code: 200 };
    };
    return result();
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  let newId = 0;
  const { name, email, phone } = body.value;
  if (!name || !email || !phone) {
    return {
      message: "missing required name field",
      status: "error",
      code: 404,
    };
  }
  try {
    const contacts = await fs.readFile(contactsPath);
    const array = JSON.parse(contacts.toString());

    array.map((item) => Number(item.id) > newId && (newId = Number(item.id)));
    await fs.writeFile(
      contactsPath,
      JSON.stringify([
        ...array,
        {
          id: (newId + 1).toString(),
          name: name,
          email: email,
          phone: phone,
        },
      ]),
    );
    return {
      data: {
        id: (newId + 1).toString(),
        name: name,
        email: email,
        phone: phone,
      },
      status: "success",
      code: 201,
    };
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  if (!name && !email && !phone) {
    return { message: "missing fields", status: "error", code: 404 };
  }
  let chosenIndex = 0;
  let filteredContact = {};
  let updatedContact = {};
  try {
    const contacts = await fs.readFile(contactsPath);
    const data = JSON.parse(contacts.toString());

    chosenIndex = data.indexOf(
      data.find((contact) => contact.id === contactId),
    );

    filteredContact = data.find((contact) => contact.id === contactId);

    updatedContact = { ...filteredContact, ...body };

    data.splice(chosenIndex, 1, updatedContact);

    if (chosenIndex !== -1) {
      fs.writeFile(contactsPath, JSON.stringify(data));
      return { data: updatedContact, status: "success", code: 200 };
    } else {
      return { message: "Not found", status: "error", code: 404 };
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
