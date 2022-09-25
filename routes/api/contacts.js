const express = require("express");
const {
  addContactValidation,
  putContactValidation,
} = require("../../middleware/validationMiddleware");

const router = express.Router();
const { contacts: ctrl } = require("../../controllers");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getContactById);

router.post("/", addContactValidation, ctrl.addContact);

router.delete("/:contactId", ctrl.deleteContact);

router.put("/:contactId", putContactValidation, ctrl.changeContact);

module.exports = router;
