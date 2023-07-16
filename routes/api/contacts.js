const express = require("express");

const {validation, ctrlWrapper, validationBody} = require("../../middlewares");
const {contactSchema} = require("../../schemas");
const {
  getListContacts,
  getOneContactById,
  addOneContact,
  removeContactById,
  updateOneContact,
} = require("../../controllers");


const router = express.Router();

router.get("/", ctrlWrapper(getListContacts));

router.get("/:id", ctrlWrapper(getOneContactById));

router.post("/", validationBody(contactSchema), validation(contactSchema), ctrlWrapper(addOneContact));

router.delete("/:id", ctrlWrapper(removeContactById));

router.put("/:id", validationBody(contactSchema), validation(contactSchema),  ctrlWrapper(updateOneContact));

module.exports = router;
