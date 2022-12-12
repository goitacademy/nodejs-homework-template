const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const contacts = require("../../models/contacts");

const { createError } = require("../../helpers/createError");

// После добавления контроллера стало так:

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", ctrl.add);

router.delete("/:contactId", async (req, res, next) => {
  try {
    const result = await contacts.removeContact(req.params.contactId);
    if (!result) {
      throw createError(404, "Contact not found");
    }
    res.status(204);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", ctrl.updateById);

module.exports = router;

// До добавления котроллера было так:

// const contactSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// });

// router.get("/", async (req, res, next) => {
//   try {
//     const result = await contacts.listContacts();
//     res.status(200).json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// router.get("/:contactId", async (req, res, next) => {
//   try {
//     const result = await contacts.getContactById(req.params.contactId);
//     if (!result) {
//       throw createError(404, "Not found");
//       //   res.status(404).json({
//       //     message: "Not found",
//       //   });
//     }

//     res.status(200).json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// router.post("/", async (req, res, next) => {
//   try {
//     const { error } = contactSchema.validate(req.body);
//     if (error) {
//       // можно было в месседж указать error.message
//       throw createError(400, "missing required name field");
//     }

//     const result = await contacts.addContact(req.body);

//     res.status(201).json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// router.delete("/:contactId", async (req, res, next) => {
//   try {
//     const result = await contacts.removeContact(req.params.contactId);
//     if (!result) {
//       throw createError(404, "Contact not found");
//     }
//     res.status(204);
//   } catch (error) {
//     next(error);
//   }
// });

// router.put("/:contactId", async (req, res, next) => {
//   try {
//     const { error } = contactSchema.validate(req.body);
//     if (error) {
//       throw createError(400, "missing fields");
//     }
//     const result = await contacts.updateContact(req.params.contactId, req.body);

//     if (!result) {
//       throw createError(404, "Not found");
//     }

//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });
