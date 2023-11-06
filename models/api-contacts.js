// import { promises as fs } from "fs";
// import { nanoid } from "nanoid";
// import path from "path";
// import "colors";

// const contactsPath = path.resolve("./models/contacts.json");

// // Get a full list of the contacts
// export async function listContacts() {
//   try {
//     const data = await fs.readFile(contactsPath, "utf-8");

//     const contacts = JSON.parse(data);

//     return contacts;
//   } catch (error) {
//     console.error("Error in listContacts:", error);
//     throw error;
//   }
// }

// // Get any contact by ID
// export async function getContactById(contactId) {
//   try {
//     const data = await listContacts();

//     return data.find((contact) => contact.id === contactId) || null;
//   } catch (error) {
//     console.log(error.red);
//   }
// }

// // Delete an existing contact
// export async function removeContact(contactId) {
//   try {
//     const data = await listContacts();

//     const UpdatedContacts = data.filter(({ id }) => id !== contactId);

//     await fs.writeFile(
//       contactsPath,
//       JSON.stringify(UpdatedContacts, null, 2),
//       "utf-8"
//     );

//     const deletedContact =
//       data.find((contact) => contactId === contact.id) || null;

//     return deletedContact;
//   } catch (error) {
//     console.log(error.red);
//   }
// }

// // Add a new contact
// export async function addContact(contactData) {
//   try {
//     const contacts = await listContacts();

//     const newContact = {
//       id: nanoid(),
//       ...contactData,
//     };

//     const updatedContacts = [newContact, ...contacts];
//     await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), {
//       encoding: "utf-8",
//     });

//     return newContact;
//   } catch (error) {
//     console.log(error.red);
//   }
// }

// // Update any existing contact
// export const updateContact = async (id, contactData) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((contact) => contact.id === id);

//   if (index === -1) {
//     return undefined;
//   }

//   const newContact = { ...contactData, id };

//   const updatedContacts = [
//     ...contacts.slice(0, index),
//     newContact,
//     ...contacts.slice(index + 1),
//   ];

//   await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), {
//     encoding: "utf-8",
//   });

//   return newContact;
// };

import { promises as fs } from "fs";
import { nanoid } from "nanoid";
import path from "path";
import "colors";

const contactsPath = path.resolve("./models/contacts.json");

// Get a full list of the contacts
export async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");

    const contacts = JSON.parse(data);

    return contacts;
  } catch (error) {
    console.error("Error in listContacts:", error);
    throw error;
  }
}

// Get any contact by ID
export async function getContactById(contactId) {
  try {
    const data = await listContacts();

    return data.find((contact) => contact.id === contactId) || null;
  } catch (error) {
    console.log(error.red);
  }
}

// Delete an existing contact
export async function removeContact(contactId) {
  try {
    const data = await listContacts();

    const UpdatedContacts = data.filter(({ id }) => id !== contactId);

    await fs.writeFile(
      contactsPath,
      JSON.stringify(UpdatedContacts, null, 2),
      "utf-8"
    );

    const deletedContact =
      data.find((contact) => contactId === contact.id) || null;

    return deletedContact;
  } catch (error) {
    console.log(error.red);
  }
}

// Add a new contact
export async function addContact(contactData) {
  try {
    const contacts = await listContacts();

    const newContact = {
      id: nanoid(),
      ...contactData,
    };

    const updatedContacts = [newContact, ...contacts];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), {
      encoding: "utf-8",
    });

    return newContact;
  } catch (error) {
    console.log(error.red);
  }
}

// Update any existing contact
export const updateContact = async (id, contactData) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);

  if (index === -1) {
    return undefined;
  }

  const newContact = { ...contactData, id };

  const updatedContacts = [
    ...contacts.slice(0, index),
    newContact,
    ...contacts.slice(index + 1),
  ];

  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), {
    encoding: "utf-8",
  });

  return newContact;
};
