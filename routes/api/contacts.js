const express = require("express");

const getAll = require("../../controllers/contacts/getAll.js");
const getById = require("../../controllers/contacts/getById.js");
const add = require("../../controllers/contacts/add.js");
const remove = require("../../controllers/contacts/remove.js");
const update = require("../../controllers/contacts/update.js");
const updateStatusContact = require("../../controllers/contacts/getByFavorite.js");

const validateBody = require("../../middlewares/validateBody.js");
const {
  contactsScheme,
  updateStatusSchema,
} = require("../../schemas/contactsScheme.js");
const checkValidId = require("../../middlewares/checkValidId.js");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", checkValidId, getById);

router.post("/", validateBody(contactsScheme), add);

router.delete("/:contactId", checkValidId, remove);

router.put("/:contactId", checkValidId, validateBody(contactsScheme), update);

router.patch(
  "/:contactId/favorite",
  checkValidId,
  validateBody(updateStatusSchema),
  updateStatusContact
);

module.exports = router;
