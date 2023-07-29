const express = require("express");

const { contactJoiSchema, statusJoiSchema } = require('../../models/contact')
const {validation, ctrlWrapper, validationBody, validationStatusBody, isValid, authenticate} = require("../../middlewares")


const {
  getListContacts,
  getOneContactById,
  addOneContact,
  removeContactById,
  updateOneContact,
  updateStatusContact,
} = require("../../controllers");

const router = express.Router()


router.get("/", authenticate, ctrlWrapper(getListContacts))

router.get("/:id", authenticate, isValid, ctrlWrapper(getOneContactById))

router.post("/", authenticate, validationBody(contactJoiSchema), validation(contactJoiSchema), ctrlWrapper(addOneContact))

router.delete("/:id", authenticate, isValid, ctrlWrapper(removeContactById));

router.put("/:id", authenticate, isValid, validationBody(contactJoiSchema), validation(contactJoiSchema), ctrlWrapper(updateOneContact))

router.patch("/:id/favorite", authenticate, isValid, validationStatusBody(statusJoiSchema), ctrlWrapper(updateStatusContact))



module.exports = router;
