/** @format */

const express = require("express");
const controllers = require('../../controllers/contactsCTRL')


const router = express.Router();
const validateBody = require('../../middlewares/validateBody')
const schema = require('../../schemas/contacts')


router.get("/", controllers.getAllContacts);

router.get("/:contactId", controllers.getContactById);

router.post("/", validateBody(schema), controllers.addNewContact);

router.delete("/:contactId", controllers.deleteContactById);

router.put("/:contactId", validateBody(schema), controllers.updateContactById);

module.exports = router;
