const express = require("express");
const isValidId = require("../middleware/isValidId")

const {getContactsList,getContactById,putContactFildFavorite,postContact,putContact,deleteContact} = require("../../controllers")
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
