const express = require('express')


const { controllerWrapper, validation,auth } = require("../../middlewares");
const {contacts} = require("../../controllers");
const { favJoiSchema } = require('../../models/contacts');
const router = express.Router()
router.get("/",auth, controllerWrapper(contacts.listContacts));
router.get("/:id", controllerWrapper(contacts.getContactById));
router.post("/",auth, controllerWrapper(contacts.addContact))
router.put("/:id", controllerWrapper(contacts.updateContact))
router.delete("/:id", controllerWrapper(contacts.removeContact))
router.patch("./id/favorite",validation(favJoiSchema), controllerWrapper(contacts.updateFav))



module.exports = router
