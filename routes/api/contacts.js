const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContactById,
  deleteContact,
  addContact,
  updateContact,
} = require("../../controllers/contactsControllers");
const models = require("../../middleware/models");
// const modelsMiddleware = require("../../middleware/models");
 


router.use(models)

router.get("/", getContacts);

router.get("/:contactId", getContactById);

router.delete("/:contactId", deleteContact);

router.post("/", addContact);

router.put("/:contactId", updateContact);

module.exports = router;
