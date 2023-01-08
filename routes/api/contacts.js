const { getContacts, getContact, addContactById, removeContactById, updateContactById } =require ("../../controller/contact_controllers")
const express = require("express");
const { tryCatchWrapper } = require("../../helpers/helpers");
const router = express.Router();
const { validateBody } = require("../../middlewares/index");
const { contactSchema } = require("../../middlewares/validate/schemas");


router.get("/", tryCatchWrapper(getContacts));
router.get("/:contactId",tryCatchWrapper(getContact));
router.post("/",validateBody(contactSchema), tryCatchWrapper(addContactById));
router.delete("/:contactId", tryCatchWrapper(removeContactById));
router.put("/:contactId", tryCatchWrapper(updateContactById));

module.exports = router;
