import { Router } from "express";
import { validateContact } from "../../validators/contacts/JoiSchema.js";
// import {
//   listContacts,
//   getContactById,
//   addContact,
//   removeContact,
//   updateContact,
// } from "../../controllers/contacts/contacts.js";

// import Joi from "joi";

import * as controllers from "../../controllers/contacts/controllers.js";

const router = Router();

// const schema = Joi.object({
//   name: Joi.string().alphanum().min(3).max(30).required(),
//   email: Joi.required(),
//   phone: Joi.required(),
// });

router.get("/", controllers.getContacts);
router.get("/:contactId", controllers.getContact);
router.post("/", validateContact, controllers.addContact);

// router.post("/", async (req, res, next) => {
//   const result = schema.validate(req.body);
//   if (result.error) {
//     res.status(400).json({ message: result.error.details[0].message });
//   } else {
//     const { id, name, email, phone } = await addContact(result.value);
//     res.status(201).json({ id, name, email, phone });
//   }
// });

// router.delete("/:contactId", async (req, res, next) => {
//   const { contactId } = req.params;
//   const contact = await removeContact(contactId);
//   if (contact) {
//     res.status(200).json({ message: "contact deleted" });
//   } else {
//     res.status(404).json({ message: "Not found" });
//   }
// });

// router.put("/:contactId", async (req, res, next) => {
//   const { contactId } = req.params;
//   const result = schema.validate(req.body);
//   if (result.error) {
//     res.status(400).json({ message: "missing fields" }); // result.error.details[0].message // ZROBIONE WEDŁUG INSTRUKCJI ZADANIA
//   } else {
//     const { isOnList, contact } = await updateContact(contactId, result.value);
//     if (!isOnList) {
//       res.status(404).json({ message: "Not found" });
//     } else {
//       res.status(200).json(contact);
//     }
//   }
// });

export default router;
