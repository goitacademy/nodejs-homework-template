const express = require("express");
const isValidId = require("../middleware/isValidId")
const getContactsList = require("../../controllers/getContactsList");
const getContactById = require("../../controllers/getContactById");
const putContactFildFavorite = require("../../controllers/putContactFildFavorite");
const postContact = require("../../controllers/postContact");
const putContact = require("../../controllers/putContact");
const deleteContact = require("../../controllers/deleteContact")
const schemas = require("../schemas");
const validate = require("../middleware/validation");
const router = express.Router();

router.get("/", getContactsList);
router.get("/:contactId",isValidId ,getContactById);
router.post("/", validate(schemas.createContact), postContact);
router.put("/:contactId", isValidId, validate(schemas.updateContact), putContact);
router.patch("/:contactId/favorite", isValidId,validate(schemas.updateFavoriteSchema),  putContactFildFavorite);
router.delete("/:contactId",isValidId , deleteContact);

module.exports = router;
