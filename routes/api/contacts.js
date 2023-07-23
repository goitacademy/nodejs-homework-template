const express = require("express");

const { contactJoiSchema, statusJoiSchema } = require('../../models/contact')
const {validation, ctrlWrapper, validationBody, validationStatusBody, isValid} = require("../../middlewares")


const {
  getListContacts,
  getOneContactById,
  addOneContact,
  removeContactById,
  updateOneContact,
  updateStatusContact,
} = require("../../controllers");

const router = express.Router()


router.get("/", ctrlWrapper(getListContacts))

router.get("/:id", isValid, ctrlWrapper(getOneContactById))

router.post("/", validationBody(contactJoiSchema), validation(contactJoiSchema), ctrlWrapper(addOneContact))

router.delete("/:id", isValid, ctrlWrapper(removeContactById));

router.put("/:id", isValid, validationBody(contactJoiSchema), validation(contactJoiSchema), ctrlWrapper(updateOneContact))

router.patch("/:id/favorite", isValid, validationStatusBody(statusJoiSchema), ctrlWrapper(updateStatusContact))



module.exports = router;
