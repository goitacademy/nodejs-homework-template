const express = require("express");
const getContactsList = require("../../controllers/getContactsList");
const getContactById = require("../../controllers/getContactById");
const postContact = require("../../controllers/postContact");
const putContact = require("../../controllers/putContact");
const deleteContact = require("../../controllers/deleteContact")
const schemas = require("../schemas");
const validate = require("../middleware/validation");
const router = express.Router();

router.get("/", getContactsList);

router.get("/:contactId", getContactById);

router.post("/", validate(schemas.createContact), postContact);
router.put("/:contactId", validate(schemas.updateContact), putContact);

router.delete("/:contactId", deleteContact);

module.exports = router;
