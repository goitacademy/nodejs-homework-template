// services\contacts.js
const fs = require("fs").promises;
const path = require("path");

const pathContacts = path.join(__dirname, "../db/contacts.json");

const listContacts = async () => {
  try {
    const result = (await fs.readFile(pathContacts)).toString();
    return {
      success: true,
      result: JSON.parse(result),
      message: "List of users",
    };
  } catch (error) {
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

const getContactById = async (id) => {
  try {
    const result = await JSON.parse(
      (await fs.readFile(pathContacts)).toString()
    );

    const foundUser = result.find((user) => user.id === id);

    if (foundUser) {
      return {
        success: true,
        result: foundUser,
        message: "User found",
      };
    } else {
      return {
        success: false,
        result: null,
        message: "User not found",
      };
    }
  } catch (error) {
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

const addContact = async (body) => {
  try {
    const result = await fs.readFile(pathContacts);
    const contacts = JSON.parse(result);

    const newId = generateUniqueId(contacts);

    const newContact = {
      id: newId,
      name: body.name,
      email: body.email,
      phone: body.phone,
    };

    contacts.push(newContact);

    await fs.writeFile(pathContacts, JSON.stringify(contacts, null, 2));

    return {
      success: true,
      result: newContact,
      message: "Contact added successfully",
    };
  } catch (error) {
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

const removeContact = async (id) => {
  try {
    if (!id) {
      return {
        success: false,
        result: null,
        message: "Invalid ID",
      };
    }

    const contactsData = await fs.readFile(pathContacts);
    const contacts = JSON.parse(contactsData);

    const contactIndex = contacts.findIndex((contact) => contact.id === id);

    if (contactIndex === -1) {
      return {
        success: false,
        result: null,
        message: "Contact not found",
      };
    }

    const [removedContact] = contacts.splice(contactIndex, 1);

    await fs.writeFile(pathContacts, JSON.stringify(contacts, null, 2));

    return {
      success: true,
      result: removedContact,
      message: "Contact deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

const updateContact = async (contactId, body) => {
  try {
    const result = await fs.readFile(pathContacts);
    const contacts = JSON.parse(result);

    const indexToUpdate = contacts.findIndex(
      (contact) => contact.id === contactId
    );

    if (indexToUpdate === -1) {
      return {
        success: false,
        result: null,
        message: "Contact not found",
      };
    }

    contacts[indexToUpdate] = {
      ...contacts[indexToUpdate],
      ...body,
    };

    await fs.writeFile(pathContacts, JSON.stringify(contacts, null, 2));

    return {
      success: true,
      result: contacts[indexToUpdate],
      message: "Contact updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

// Función auxiliar para generar un ID único
function generateUniqueId(contacts) {
  let newId;
  do {
    newId = generateRandomId();
  } while (contacts.some((contact) => contact.id === newId));
  return newId;
}

// Función auxiliar para generar un ID aleatorio
function generateRandomId() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
