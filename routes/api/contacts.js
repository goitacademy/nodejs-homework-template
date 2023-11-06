// import { Router } from "express";
// import {
//   addContact,
//   getContactById,
//   listContacts,
//   removeContact,
//   updateContact,
// } from "../../models/api-contacts.js";
// import { contactValidate } from "../../validation/contacts.js";

// const router = Router();

// // Get all of the contacts
// router.get("/", async (req, res, next) => {
//   try {
//     const contacts = await listContacts();

//     if (!contacts) return next();
//     res.status(200).json(contacts);
//   } catch (error) {
//     next(error);
//   }
// });

// // Get contacts by ID
// router.get("/:contactId", async (req, res, next) => {
//   const { contactId } = req.params;

//   const contact = await getContactById(contactId);

//   if (!contact) return next();

//   res.status(200).json(contact);
// });

// // Add a new Contact
// router.post("/", async (req, res) => {
//   const { error } = contactValidate(req.body);

//   if (typeof error !== "undefined") {
//     return res
//       .status(400)
//       .send(error.details.map((err) => err.message).join(", "));
//   }

//   const contact = await addContact(req.body);

//   if (!contact) res.status(400).json({ message: "missing required fields" });

//   res.status(201).json(contact);
// });

// // Delete any Contact
// router.delete("/:contactId", async (req, res) => {
//   const { contactId } = req.params;

//   const contact = await removeContact(contactId);

//   if (!contact) res.status(400).json({ message: "missing required fields" });

//   res.status(200).json(contact);
// });

// // Update any contact's information
// router.put("/:contactId", async (req, res, next) => {
//   const { contactId } = req.params;

//   const contact = await updateContact(contactId, req.body);

//   if (!contact) return next();

//   res.status(200).json(contact);
// });

// export default router;

import { Router } from "express";
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
} from "../../models/api-contacts.js";
import { contactValidate } from "../../validation/contacts.js";

const router = Router();

// Get all of the contacts
router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();

    if (!contacts) return next();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

// Get contacts by ID
router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);

  if (!contact) return next();

  res.status(200).json(contact);
});

// Add a new Contact
router.post("/", async (req, res) => {
  const { error } = contactValidate(req.body);

  if (typeof error !== "undefined") {
    return res
      .status(400)
      .send(error.details.map((err) => err.message).join(", "));
  }

  const contact = await addContact(req.body);

  if (!contact) res.status(400).json({ message: "missing required fields" });

  res.status(201).json(contact);
});

// Delete any Contact
router.delete("/:contactId", async (req, res) => {
  const { contactId } = req.params;

  const contact = await removeContact(contactId);

  if (!contact) res.status(400).json({ message: "missing required fields" });

  res.status(200).json(contact);
});

// Update any contact's information
router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await updateContact(contactId, req.body);

  if (!contact) return next();

  res.status(200).json(contact);
});

export default router;
