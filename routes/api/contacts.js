const express = require("express");
// const Joi = require("joi");

// const contacts = require("../../models/contacts.js");
// const Contact = require("../../models/contact")
const Contact = require("../../models/contact")

// const { RequestError } = require("../../helpers");

const router = express.Router();

// const postCheckingSchema = Joi.object({
//   name: Joi.string()
//     .min(3)
//     .alphanum()
//     .required()
//     .error(new Error("missing required name field")),
//   email: Joi.string()
//     .email()
//     .required()
//     .error(new Error("missing required email field")),
//   phone: Joi.string()
//     .required()
//     .error(new Error("missing required phone field")),
// });

// const putCheckingSchema = Joi.object({
//   name: Joi.string().min(3).alphanum(),
//   email: Joi.string().email(),
//   phone: Joi.string(),
// }).min(1);

router.get("/", async (req, res, next) => {
  try {
    const result = await Contact.Find();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// router.get("/:contactId", async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await contacts.getContactById(contactId);
//     if (!result) {
//       throw RequestError(404, "Not found");
//     }
//     res.status(200).json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// router.post("/", async (req, res, next) => {
//   try {
//     const { error } = postCheckingSchema.validate(req.body);
//     if (error) {
//       console.log(error.context);
//       throw RequestError(400, error.message);
//     }
//     const result = await contacts.addContact(req.body);
//     res.status(201).json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// router.delete("/:contactId", async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await contacts.removeContact(contactId);
//     console.log(result);
//     if (!result) {
//       throw RequestError(400, "Not found");
//     }
//     res.status(200).json({ message: "contact deleted" });
//   } catch (error) {
//     next(error);
//   }
// });

// router.put("/:contactId", async (req, res, next) => {
//   try {
//     const { error } = putCheckingSchema.validate(req.body);
//     if (error) {
//       throw RequestError(400, "missing fields");
//     }

//     const { contactId } = req.params;
//     const result = await contacts.updateContact(contactId, req.body);
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
