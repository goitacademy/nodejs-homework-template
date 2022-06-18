const express = require("express");

const { validation, ctrlWrapper } = require("../../middlewares");
const { contactsJoiSchema } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");

// const validateMiddleware = validation(contactShema);

// const Joi = require("joi");
// const contacts = require("../../models/contacts");
// const createError = require("../../errors");
const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", validation(contactsJoiSchema), ctrlWrapper(ctrl.add));

router.put("/:id", validation(contactsJoiSchema), ctrlWrapper(ctrl.updateById));

router.delete("/:id", ctrlWrapper(ctrl.removeById));

// const schema = Joi.object({
//   name: Joi.string().min(2).required(),
//   email: Joi.string().email({
//     minDomainSegments: 2,
//     tlds: { allow: ["com", "net"] },
//   }),
//   phone: Joi.number().required(),
// });

// router.get("/", async (req, res, next) => {
//   try {
//     const all = await contacts.listContacts();
//     res.json(all);
//   } catch (e) {
//     next(e);
//   }
// });

// router.get("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const contact = await contacts.getContactById(id);
//     if (!contact) {
//       res.status(404).json({ message: "Not found" });
//     } else {
//       res.json(contact);
//     }
//   } catch (e) {
//     next(e);
//   }
// });

// router.post("/", async (req, res, next) => {
//   try {
//     const { error } = schema.validate(req.body);
//     if (error) {
//       throw createError(400, error.message);
//     }
//     const { name, email, phone } = req.body;
//     const contact = await contacts.addContact(name, email, phone);
//     res.status(201).json(contact);
//   } catch (e) {
//     next(e);
//   }
// });

// router.delete("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const contact = await contacts.removeContact(id);
//     if (!contact) {
//       res.status(404).json({ message: "Not Found" });
//     } else {
//       res.status(200).json({ message: "contact deleted" });
//     }
//   } catch (e) {
//     next(e);
//   }
// });

// router.put("/:id", async (req, res, next) => {
//   try {
//     const { error } = schema.validate(req.body);
//     if (error) {
//       throw createError(400, error.message);
//     }
//     const { name, email, phone } = req.body;
//     const { id } = req.params;

//     const contact = await contacts.updateContact(id, name, email, phone);
//     if (!contact) {
//       res.status(404).json({ message: "Not Found" });
//     } else {
//       res.json(contact);
//     }
//   } catch (e) {
//     next(e);
//   }
// });

module.exports = router;
