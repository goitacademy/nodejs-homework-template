const express = require("express");
const router = express.Router();
const handlerError = require("../../../middlewears/handlerError");
const contactService = require("../api/contacts");
const auth = require('../../../middlewears/auth')
router.get("/", auth, contactService.getContacts);

router.get("/:contactId", contactService.getContactId);

router.post("/", contactService.postContact);

router.delete("/:contactId", contactService.deleteContact);

router.put("/:contactId", contactService.putUpdateContact);

router.patch("/:contactId/favorite", contactService.patchUpdateFavorite);

router.use(handlerError);

module.exports = router;
