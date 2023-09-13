const express = require("express");
const Joi = require("joi");
const Contact = require("../../models/contact");

const { HttpError } = require("../../helpers");

const contacts = require("../../models/contacts");

const router = express.Router();

// const addSchema = Joi.object({
//   name: Joi.string().min(3).max(30).required(),
//   email: Joi.string().email().required(),
//   phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
// });

router.get("/", async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// router.get("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await contacts.getContactById(id);
//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });

router.post("/", async (req, res, next) => {
  try {
    // const { error } = addSchema.validate(req.body);
    // if (error) {
    //   const missingField = error.details[0].context.label;
    //   throw HttpError(400, `field ${missingField} is not valid`);
    // }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

// router.delete("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await contacts.removeContact(id);
//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//     res.status(200).json({
//       message: "contact deleted",
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// router.put("/:id", async (req, res, next) => {
//   try {
//     const bodyIsEmpty = !Object.keys(req.body).length;

//     if(bodyIsEmpty){
//       throw HttpError(400, "missing fields");
//     }

//     const { id } = req.params;
//     const result = await contacts.updateContact(id, req.body);
//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//     res.json(result)
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
