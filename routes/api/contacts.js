const express = require("express");

const listContacts = require("../../controllers/listContacts");
const getById = require("../../controllers/getById");
const addContact = require("../../controllers/addContact");
const removeContact = require("../../controllers/removeContact");
const updateContact = require("../../controllers/updateContact");
const updateStatusContact = require("../../controllers/updateStatusContact");

const validateData = require("../../middlewares/addValidator");
const validateUpdateData = require("../../middlewares/updateValidator");
const validateStatusData = require("../../middlewares/updateStatusValidator");

const asyncWrapper = require("../../helpers/asyncWrapper");

const router = express.Router();

router.get("/", asyncWrapper(listContacts));

router.get("/:contactId", asyncWrapper(getById));

router.post("/", validateData, asyncWrapper(addContact));

router.delete("/:contactId", asyncWrapper(removeContact));

router.put("/:contactId", validateUpdateData, asyncWrapper(updateContact));

router.patch(
  "/:contactId/favorite",
  validateStatusData,
  asyncWrapper(updateStatusContact)
);

module.exports = router;
