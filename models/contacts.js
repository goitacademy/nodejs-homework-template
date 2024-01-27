import { Contact } from '../models/contactSchema.js';

export const listContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error) {
    throw error;
  }
}

export const getContactById = async (contactId) => {
  try {
    const contact = await Contact.findById(contactId);
    return contact;
  } catch (error) {
    throw error;
  }
}

export const removeContact = async (contactId) => {
  try {
    const result = await Contact.findByIdAndDelete(contactId);
    return result !== null;
  } catch (error) {
    throw error;
  }
}

export const addContact = async (body) => {
  try {
    const newContact = await Contact.create(body);
    return newContact;
  } catch (error) {
    throw error;
  }
}

export const updateContact = async (contactId, body) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, body, { new: true });
    return updatedContact;
  } catch (error) {
    throw error;
  }
}

export const updateFavoriteStatus = async (contactId, body) => {
  if (!body || body.favorite === undefined) {
    return { status: 400, message: 'missing field favorite"' };
  }

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite: body.favorite },
      { new: true }
    );

    if (updatedContact) {
      return { status: 200, contact: updatedContact };
    } else {
      return { status: 404, message: 'Not found' };
    }
  } catch (error) {
    throw error;
  }
};





// import fs from 'fs/promises';
// import path from 'path';

// const contactsFilePath = path.join(process.cwd(), "./models/contacts.json");

// export const listContacts = async () => {
//   try {
//     const data = await fs.readFile(contactsFilePath, 'utf-8');
//     const contacts = JSON.parse(data);
//     return contacts;
//   } catch (error) {
//     throw error;
//   }
// }

// const getContactById = async (contactId) => {
//   try {
//     const contacts = await listContacts();
//     const contact = contacts.find((c) => c.id === contactId);
//     return contact;
//   } catch (error) {
//     throw error;
//   }
// }

// const removeContact = async (contactId) => {
//   try {
//     let contacts = await listContacts();
//     contacts = contacts.filter((c) => c.id !== contactId);
//     await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
//     return true;
//   } catch (error) {
//     throw error;
//   }
// }

// const addContact = async (body) => {
//   try {
//     const contacts = await listContacts();
//     const newContact = { id: generateUniqueId(), ...body };
//     contacts.push(newContact);
//     await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
//     return newContact;
//   } catch (error) {
//     throw error;
//   }
// }

// const updateContact = async (contactId, body) => {
//   try {
//     let contacts = await listContacts();
//     const index = contacts.findIndex((c) => c.id === contactId);

//     if (index === -1) {
//       return null; // Not found
//     }

//     contacts[index] = { ...contacts[index], ...body };
//     await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
//     return contacts[index];
//   } catch (error) {
//     throw error;
//   }
// }

// const generateUniqueId = () => {
//   return Math.random().toString(36).substr(2, 9);
// };

// export { getContactById, removeContact, addContact, updateContact };

