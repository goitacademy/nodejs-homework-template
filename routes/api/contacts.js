const { Router } = require("express");
const PhoneContacts = require("../api/controller");
const { controlValidation, PatchContact } = require("./assets/validate");
const router = Router();
router.get("/", PhoneContacts.getContacts);
router.get("/:contactId", PhoneContacts.findContactById);

router.post("/", controlValidation, PhoneContacts.postContact);
router.delete("/:contactId", PhoneContacts.deleteContact);

router.patch("/:contactId", PatchContact, PhoneContacts.patchContact);
module.exports = router;
