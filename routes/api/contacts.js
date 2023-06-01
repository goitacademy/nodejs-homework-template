
const express = require("express");
const router = express.Router();

const findContactById = require("../../controllers/findContactById");
const addContact = require("../../controllers/addContact");
const deleteContact = require("../../controllers/deleteContact");
const updateContact = require("../../controllers/updateContact");
const contactList = require("../../controllers/contactList");
const validate = require('../../middlewares/validator');

const isValidId = require("../../middlewares/isValidId");
const updateFavorite = require("../../controllers/updateFavorite");
const schemas = require("../../shema/shema");
const { updateFavoriteSchema } = require("../../shema/shema");


router.get("/", contactList);

router.get("/:contactId",isValidId , findContactById);

router.post("/", validate.validate(schemas.addSchema), addContact);

router.delete("/:contactId", isValidId , deleteContact);

router.put("/:contactId", isValidId , validate.validate(schemas.addSchema), updateContact);

router.patch("/:contactId/favorite", isValidId , validate.validateFavorite(updateFavoriteSchema), updateFavorite);



module.exports = router;
