const express = require('express')

const { contactJoiSchema, statusJoiSchema } = require('../../models/contacts')
const {validation, ctrlWrapper, validationBody, validationStatusBody} = require("../../middlewares")

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

router.get("/:id", ctrlWrapper(getOneContactById))

router.post("/", validationBody(contactJoiSchema), validation(contactJoiSchema), ctrlWrapper(addOneContact))

router.delete("/:id", ctrlWrapper(removeContactById));

router.put("/:id", validationBody(contactJoiSchema), validation(contactJoiSchema), ctrlWrapper(updateOneContact))

router.patch("/:id/favorite", validationStatusBody(statusJoiSchema), ctrlWrapper(updateStatusContact))


module.exports = router
