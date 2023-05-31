
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
const schemas = require("../../shemaJoi/shemaJoi");


router.get("/", contactList);

router.get("/:contactId",isValidId , findContactById);

router.post("/", validate(schemas.addSchema), addContact);

router.delete("/:contactId", isValidId , deleteContact);

router.put("/:contactId", isValidId , validate(schemas.addSchema), updateContact);

router.patch("/:contactId/favorite", isValidId , validate(schemas.updateFavoriteSchema), updateFavorite);



module.exports = router;
