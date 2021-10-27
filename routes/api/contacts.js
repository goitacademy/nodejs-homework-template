const express = require("express")
const router = express.Router()
const functions = require("../../model/index")

router.get("/", functions.listContacts)

router.get("/:contactId", functions.getContactById)

router.post("/", functions.addContact)

router.delete("/:contactId", functions.removeContact)

router.patch("/:contactId", functions.updateContact)

module.exports = router
