const express = require("express");
const router = express.Router();

const { joiSchema } = require("../../models/contacts");
const { joyValidation, isValidId } = require("../../middleware/index");
const validateMiddleware = joyValidation(joiSchema);

const { getAll, getById, addById, updateById } = require("../../controllers/index");
router.get("/", getAll);
router.get('/:contactId',isValidId,  getById);
router.post("/", validateMiddleware, addById);
// router.post('/',  addById);

// router.delete('/:contactId', deleteById);
// router.put('/:contactId', isValidId, validateMiddleware, updateById);
router.put('/:contactId', updateById);


module.exports = router;
