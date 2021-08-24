const { Router } = require("express");
const ControllerContact = require("../../routes/api/controller");
const { validateContact, validatePatchContact } = require("./helpers/validate");

const router = Router();

router.get("/", ControllerContact.getContacts);

router.get("/:contactId", ControllerContact.findContactById);

router.post("/", validateContact, ControllerContact.postContact);
router.delete("/:contactId", ControllerContact.deleteContact);

router.patch("/:contactId", validatePatchContact, ControllerContact.patchContact);

module.exports = router;
