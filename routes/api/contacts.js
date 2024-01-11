const express = require("express");
const validateBody = require("../../middlewares/validateBody.js");


const {
  contactAddSchema,
  contactUpdateSchema,
} = require("../../schemas/contacts.js");

const {
  getById,
 
  addContactById,
  deleteContactById,
  updateContactById,
  getAll,
} = require("../../controller/contacts.js");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", validateBody(contactAddSchema), addContactById);

router.delete("/:contactId", deleteContactById);

router.put("/:contactId", validateBody(contactUpdateSchema), updateContactById);

module.exports = router;
