const express = require("express")
const router = express.Router()
const { contacts: ctrl } = require("../../controllers")
const { validate } = require("../../validate/schemas")

router.get("/", ctrl.listContacts)

router.get("/:contactId", ctrl.getContactById)

router.post("/", express.json(), validate.addContact, ctrl.addContact)

router.delete("/:contactId", ctrl.removeContact)

router.put(
  "/:contactId",
  express.json(),
  validate.updateContact,
  ctrl.updateContact
)

router.patch(
  "/:contactId/favorite",
  express.json(),
  validate.updateStatusContact,
  ctrl.updateStatusContact
)

module.exports = router
