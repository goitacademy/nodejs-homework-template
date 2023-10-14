const express = require("express");
const ctrl = require("../../controllers/contacts");

const router = express.Router();

const validateBody = require("../../middlewares/validateBody");
const  aunauthorized  = require("../../middlewares/aunauthorized "); 
const addSchema = require("../../schemas/contacts");

router.get("/",aunauthorized, ctrl.listContacts);

router.get("/:contactId",aunauthorized,ctrl.getContactById);

router.post("/",aunauthorized,validateBody(addSchema.addShema), ctrl.addContact);

router.delete("/:contactId",aunauthorized, ctrl.removeContact);

router.put("/:contactId",aunauthorized,validateBody(addSchema.addShemaPut), ctrl.updateContact);

router.patch('/:contactId',aunauthorized, ctrl.updateStatusContact)

module.exports = router;
