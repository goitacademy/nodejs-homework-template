const express = require("express");
const router = express.Router();
const contactsController = require("../../controller/contacts.controller");

router.get("/contacts", contactsController.get);

// router.get("/contacts/:id", contactsController.getById);

// router.post("/contacts", contactsController.create);

// router.put("/contacts/:id", contactsController.update);

// router.patch("/contacts/:id/favorite", contactsController.updateFavorite);

// router.delete("/contacts/:id", contactsController.remove);

module.exports = router;

// const express = require("express");
// const {
//   listContacts,
//   getContactById,
//   addContact,
//   removeContact,
//   updateContact,
// } = require("../../models/contacts");
// const Joi = require("joi");

// const contactSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().email().required(),
//   phone: Joi.string().required(),
// });

// const router = express.Router();

// router.get("/", async (req, res, next) => {
//   try {
//     const contacts = await listContacts();
//     res.status(200).json(contacts);
//   } catch (error) {
//     console.error("Error handling GET /api/contacts:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// router.get("/:contactId", async (req, res, next) => {
//   try {
//     const contactId = req.params.contactId;
//     const contact = await getContactById(contactId);
//     if (!contact) {
//       return res.status(404).json({ error: "Contact not found" });
//     }
//     res.status(200).json(contact);
//   } catch (error) {
//     console.error("Error handling GET /api/contacts:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// router.post("/", async (req, res, next) => {
//   try {
//     const { error } = contactSchema.validate(req.body);

//     if (error) {
//       return res
//         .status(400)
//         .json({ message: "Validation error", details: error.details });
//     }
//     const { name, email, phone } = req.body;
//     if (!name) {
//       return res.status(400).json({ message: "missing required name - field" });
//     }
//     if (!email) {
//       return res
//         .status(400)
//         .json({ message: "missing required email - field" });
//     }
//     if (!phone) {
//       return res
//         .status(400)
//         .json({ message: "missing required phone - field" });
//     }
//     const newContact = await addContact({ name, email, phone });
//     res.status(201).json(newContact);
//   } catch (error) {
//     console.error("Error handling POST /api/contacts:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// router.delete("/:contactId", async (req, res, next) => {
//   try {
//     const contactId = req.params.contactId;
//     const isDeleted = await removeContact(contactId);

//     if (isDeleted) {
//       return res.status(200).json({ message: "contact deleted" });
//     } else {
//       return res.status(404).json({ message: "Not found" });
//     }
//   } catch (error) {
//     console.error("Error handling DELETED /api/contacts/:id:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// router.put("/:contactId", async (req, res, next) => {
//   try {
//     const contactId = req.params.contactId;
//     const body = req.body;

//     if (!body) {
//       res.status(400).json({ message: "missing fields" });
//     }
//     const { error } = contactSchema.validate(body);

//     if (error) {
//       return res
//         .status(400)
//         .json({ message: "Validation error", details: error.details });
//     }
//     const updatedContact = await updateContact(contactId, body);
//     console.log("dojdz");
//     if (updatedContact !== null) {
//       return res.status(200).json(updatedContact);
//     } else {
//       return res.status(404).json({ message: "Not found" });
//     }
//   } catch (error) {
//     console.error("Error handling POST /api/contacts/:id:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// module.exports = router;
