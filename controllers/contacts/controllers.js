import e from "express";
import * as helpers from "./helpers.js";

export const getContacts = async (req, res, next) => {
  try {
    const contacts = await helpers.fetchContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await helpers.fetchContact(contactId);
    if (contact) {
      res.json(contact);
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

export const addContact = async (req, res, next) => {
  try {
    const contact = await helpers.insertContact(req.body);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

export const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await helpers.removeContact(contactId);
    if (contact) {
      res.status(200).json({ message: "contact deleted" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

// export const removeContact = async (contactId) => {
//   try {
//     const contacts = await listContacts();
//     if (await contacts.find((item) => item.id === contactId)) {
//       const updatedContacts = await contacts.filter(
//         (item) => item.id !== contactId
//       );
//       await writeFile("models/contacts.json", JSON.stringify(updatedContacts));
//       return true;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     return error;
//   }
// };

// export const updateContact = async (contactId, obj) => {
//   try {
//     const contacts = await listContacts();
//     const isOnList = await contacts.find((item) => item.id === contactId);
//     if (isOnList) {
//       const updatedContacts = await contacts.map((item) =>
//         item.id === contactId ? { ...item, ...obj } : item
//       );
//       await writeFile("models/contacts.json", JSON.stringify(updatedContacts));
//       return {
//         isOnList: true,
//         contact: updatedContacts.find((item) => item.id === contactId),
//       };
//     } else {
//       return { isOnList: false, contact: null };
//     }
//   } catch (error) {
//     return error;
//   }
// };
