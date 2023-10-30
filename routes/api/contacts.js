const express = require("express");
const { getAll, getById, add, update, remove } = require('../../controllers');
const { validateBody } = require('../../middleware');
const { contactsSchema } = require('../../schemas');
const router = express.Router();


router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", validateBody(contactsSchema), add);

router.delete("/:contactId", remove);

router.put("/:contactId", validateBody(contactsSchema), update);

module.exports = router;
