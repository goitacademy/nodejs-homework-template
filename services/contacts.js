const fs = require('fs').promises;
const path = require('path');

const pathContacts = path.join(__dirname, '../models/contacts.json');

const listAllContacts = async () => {
  try {
    const result = (await fs.readFile(pathContacts)).toString();
    return JSON.parse(result);
  } catch (error) {
    console.log(error);
  }
};

/* metodo de busqueda con for of
const getContactById = async contactId => {
  try {
    const result = await JSON.parse(
      (await fs.readFile(pathContacts)).toString(),
    );
    for (contact of result) {
      if (contact.id == contactId) {
        return contact;
      }
    }
  } catch (error) {
    console.log(error);
  }
};*/

const getContactById = async contactId => {
  try {
    const contactsData = await fs.readFile(pathContacts, 'utf-8');
    const contacts = JSON.parse(contactsData);

    const contact = contacts.find(c => c.id == contactId);

    if (contact) {
      return contact;
    } else {
      return {
        success: false,
        result: null,
        message: 'Contact not found',
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

const addContact = async body => {
  try {
    console.log(body);
    const userRegistered = await User.create(body);

    console.log(userRegistered);

    if (!userRegistered) {
      return {
        success: false,
        result: null,
        message: 'There is an error try creating user.',
      };
    }

    return {
      success: true,
      result: userRegistered,
      message: 'User registered successfully.',
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
    const contactsData = await fs.readFile(pathContacts, 'utf-8');
    const contacts = JSON.parse(contactsData);

    const contactIndex = contacts.findIndex(c => c.id == contactId);

    if (contactIndex !== -1) {
      contacts[contactIndex] = { ...contacts[contactIndex], ...body };

      await fs.writeFile(pathContacts, JSON.stringify(contacts, null, 2));

      return {
        success: true,
        result: contacts[contactIndex],
        message: 'The contact was updated successfully.',
      };
    } else {
      return {
        success: false,
        result: null,
        message: 'Contact not found',
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

const removeContact = async contactId => {
  try {
    const contactsData = await fs.readFile(pathContacts, 'utf-8');
    const contacts = JSON.parse(contactsData);

    const contactIndex = contacts.findIndex(c => c.id == contactId);

    if (contactIndex !== -1) {
      contacts.splice(contactIndex, 1);

      await fs.writeFile(pathContacts, JSON.stringify(contacts, null, 2));

      return {
        success: true,
        result: null,
        message: 'The contact was deleted successfully.',
      };
    } else {
      return {
        success: false,
        result: null,
        message: 'Contact not found',
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

module.exports = {
  listAllContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
