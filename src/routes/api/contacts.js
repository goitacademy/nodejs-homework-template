const express = require("express");
const router = express.Router();

// const {joyValidation} = require('../../middleware');
// const {contactSchema} = require ('../../schemas');
// const joyValidate = joyValidation(contactSchema);
const { joiSchema } = require("../../models/contacts");
const { joyValidation } = require("../../middleware/index");
const validateMiddleware = joyValidation(joiSchema);
// const {
//   // getAll,
//   // getById,
//   addById,
//   // deleteById,
//   // updateById,
// } = require("../../controllers/index");

const { getAll, addById } = require("../../controllers/index");
router.get("/", getAll);
// router.get('/:contactId', getById);
router.post("/", validateMiddleware, addById);
// router.post('/',  addById);

// router.delete('/:contactId', deleteById);
// router.put('/:contactId', validateMiddleware, updateById);

module.exports = router;
