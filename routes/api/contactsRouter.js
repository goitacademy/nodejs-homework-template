const express = require('express');
const router = express.Router();
const ctrlWrapper = require('../../middleware/ctrlWrapper');
const { auth } = require('../../middleware/authMiddleware');
const { validateRequest } = require('../../middleware/joiValidation');
const { 
  contactAddSchema, 
  contactUpdateSchema, 
  contactUpdateStatusSchema 
} = require('../../validation/validationShema');

const { 
  getAll, 
  getById, 
  add, 
  remove, 
  updateById, 
  updateStatus, 
} = require('../../controller/contacts');

router.get('/', auth, ctrlWrapper(getAll));
router.get('/:id', auth, ctrlWrapper(getById));
router.post("/", auth, validateRequest(contactAddSchema), ctrlWrapper(add));
router.delete("/:id", auth, ctrlWrapper(remove));
router.put("/:id", auth, validateRequest(contactUpdateSchema), ctrlWrapper(updateById));
router.patch("/:id/favorite", auth, validateRequest(contactUpdateStatusSchema), ctrlWrapper(updateStatus));

module.exports = router;
