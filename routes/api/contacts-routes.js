const express = require("express");
const contactsController = require("../../controllers/contacts-controllers");
// const contactsService = require("../../models/_to_delete_contacts");
const { contactAddSchema, contactPutSchema } = require("../../schemas");
const { validateBody } = require("../../decorators");
const { isValidId } = require("../../middlewares");
// const { HttpError } = require("../../helpers");

const router = express.Router();

// const Contact = require("../../models/contacts-model");
router.get("/", contactsController.getAllContacts);
// router.get("/", async (req, res) => {
//   try {
//     const contacts = await Contact.find();
//     res.json(contacts);
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// router.get("/", async (req, res, next) => {
//   try {
//     const result = await contactsService.listContacts();
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// router.get("/:contactId", async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await contactsService.getContactById(contactId);
//     if (!result) {
//       throw HttpError(404);
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// router.post("/", async (req, res, next) => {
//   try {
//     const { error } = contactAddSchema.validate(req.body);
//     if (error) {
//       throw HttpError(400, error.message);
//     }
//     const result = await contactsService.addContact(req.body);
//     res.status(201).json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// router.delete("/:contactId", async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await contactsService.removeContact(contactId);
//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//     res.json({ message: "contact deleted" });
//   } catch (error) {
//     next(error);
//   }
// });

// router.put("/:contactId", async (req, res, next) => {
//   try {
//     const { error } = contactPutSchema.validate(req.body);
//     if (error) {
//       throw HttpError(400, error.message);
//     }
//     const { contactId } = req.params;
//     const result = await contactsService.updateContactById(contactId, req.body);
//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
