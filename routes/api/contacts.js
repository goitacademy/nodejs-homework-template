const express = require("express");
const ctrl = require("../../controllers/contacts");

const router = express.Router();

// const contacts = require("../../models/contacts");

router.get("/", ctrl.getAll);
// async (req, res, next) => {
//   // const data = await contacts.listContacts();
//   // res.status(200).json(data);
// });

router.get("/:contactId", ctrl.getContactById);
// async (req, res, next) => {
// try {
//   const { contactId } = req.params;
//   const data = await contacts.getContactById(contactId);
//   if (!data) {
//     res.status(404).json({ message: "Not found her" });
//   }
//   res.status(200).json(data);
// } catch (err) {
//   next(err);
// }
// });

router.post("/", ctrl.addContact);
//   async (req, res, next) => {
//   // try {
//   //   const { error, value } = schema.validate(req.body, {
//   //     abortEarly: false,
//   //     allowUnknown: true,
//   //   });
//   //   if (typeof error !== "undefined") {
//   //     res.status(400).send({ message: error.details[0].message });
//   //   }
//   //   const newContact = await contacts.addContact(value);
//   //   res.status(201).json(newContact);
//   // } catch (err) {
//   //   next(err);
//   // }
// });

router.delete("/:contactId", ctrl.removeContact);
//   async (req, res, next) => {
//   // try {
//   //   const { contactId } = req.params;
//   //   const data = await contacts.removeContact(contactId);
//   //   if (!data) {
//   //     res.status(404).json({ message: "Not found her" });
//   //   }
//   //   res.status(200).json({ message: "contact deleted" });
//   // } catch (err) {
//   //   next(err);
//   // }
// });

router.put("/:contactId", ctrl.updateContact);
//   async (req, res, next) => {
//   // try {
//   //   const { contactId } = req.params;
//   //   const body = req.body;
//   //   if (Object.keys(body).length === 0) {
//   //     res.status(400).json({ message: "missing fields" });
//   //   }
//   //   if (body) {
//   //     const data = await contacts.updateContact(contactId, body);
//   //     if (!data) {
//   //       res.status(404).json({ message: "Not found" });
//   //     }
//   //     res.status(200).json({ contact: data });
//   //   }
//   // } catch (err) {
//   //   next(err);
//   // }
// });

module.exports = router;
