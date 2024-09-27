const express = require('express')
const contacts = require("../../controllers/contacts");
const IsValidId = require('../../middlewares/idCheck')
const validBody = require('../../middlewares/validBody')
const { schema, updateSchema, updateFavoriteSchema } = require('../../schema/Schema')

const router = express.Router();

router.get("/", contacts.listContacts);

router.post("/", validBody(schema), contacts.addContact);

router.get("/:contactId", IsValidId, contacts.getContactById);

router.delete("/:contactId", IsValidId, contacts.removeContact);

router.put("/:contactId", IsValidId, validBody(updateSchema), contacts.updateContact);

router.patch("/:contactId/favorite", IsValidId, validBody(updateFavoriteSchema), contacts.updateFavorite);


module.exports = router
