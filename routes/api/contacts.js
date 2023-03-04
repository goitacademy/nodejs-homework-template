const express = require("express");
const router = express.Router();
const {
  getContactsController ,
  getContactByIdController ,
  deleteContactController ,
  addContactController ,
  updateContactController ,
} = require("../../controllers/contactsControllers");
const { asyncWrapper } = require("../../helpers/apiHelpers");



router.get("/", asyncWrapper(getContactsController ));

router.get("/:id", asyncWrapper(getContactByIdController) );

router.delete("/:id", deleteContactController );

router.post("/", addContactController );

router.put("/:id", updateContactController );

module.exports = router;
