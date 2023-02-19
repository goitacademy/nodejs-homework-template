const express = require("express");
const router = express.Router();
const { contactValidation } = require("../../middlewares/validationMiddleware");
const {getAllContacts} = require('../../controllers/getAllContactsController')
const {getOneContactById} = require('../../controllers/getOneContactByIdController')
const {addNewContact} = require('../../controllers/addNewContactController')
const {removeContactById} = require('../../controllers/removeContactByIdController')
const {changeContactById} = require('../../controllers/changeContactByIdController')

router.get("/", getAllContacts);

router.get("/:contactId", getOneContactById);

router.post("/", contactValidation, addNewContact);

router.delete("/:contactId", removeContactById);

router.put("/:contactId", contactValidation, changeContactById);

module.exports = router;
