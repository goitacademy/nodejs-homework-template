const { getContacts, getContact, addContactById, removeContactById, updateContactById } =require ("../../controllers/contact-controller.js")
const express = require("express");
const { tryCatchWrapper } = require("../../helpers/helpers");
const router = express.Router();
const { contactSchema } = require("../../middleware/validate/schemas");
const {validateBody} = require("../../middleware/index");


router.get("/", tryCatchWrapper(getContacts));
router.get("/:contactId",tryCatchWrapper(getContact));
router.post("/",validateBody(contactSchema), tryCatchWrapper(addContactById));
router.delete("/:contactId", tryCatchWrapper(removeContactById));
router.put("/:contactId", tryCatchWrapper(updateContactById));
router.patch("/:contactId/favorite", tryCatchWrapper(updateContactById));
module.exports = router;
