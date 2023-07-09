// const express = require("express");
// const path = require("path");
// const ctrl = require(path.resolve(__dirname, "../../controllers"));
// const { validateBody } = require(path.resolve(__dirname, "../../middlewares"));
// const schemas = require(path.resolve(__dirname, "../../schemas"));

// const router = express.Router();

// router.get("/", ctrl.contacts.getAll);

// router.get("/:contactId", ctrl.contacts.getById );

// router.post("/", validateBody(schemas.addSchema), ctrl.contacts.add);

// router.delete("/:contactId", ctrl.contacts.deleteById );

// router.put("/:contactId", validateBody(schemas.addSchema), ctrl.contacts.updateContactById);

// module.exports = router;


// =====================================

const express = require("express");
// const Joi = require("joi")
// const path = require("path");
// const { httpError} = require(path.resolve(__dirname, "../../helpers"))
// const {
//     listContacts,
//     getContactById,
//     addContact,
//     updateContact,
//     removeContact,
// } = require(path.resolve(__dirname, "../../models/contacts"));

// const addSchema = Joi.object({
//   name: Joi.string()
//   .trim()
//   .required(),
//   email: Joi.string()
//   .trim()
//   .email()
//   .required(),
//   phone: Joi.string()
//   .trim()
//   .regex(/^\+\d{1}\d{8,15}$/)
//   .messages({
//     'string.pattern.base': 'Phone number must start with a plus sign (+) and have 9 to 16 digits.',
//   })
//   .required()
// });

  const ctrl =require("../../controllers/contacts")
  const router = express.Router();

  router.get("/", ctrl.getAll);

  router.get("/:contactId", ctrl.getById);

  router.post("/", ctrl.add);

  router.delete("/:contactId", ctrl.deleteById);

  router.put("/:contactId", ctrl.updateContactById);
  
  module.exports = router;