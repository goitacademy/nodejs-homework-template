const express = require("express");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");
const { validation,ctrlWrapper,authToken } = require("../../middlewares");
const { contactJoiSchema,contactSchemaUpdate,favoriteSchema } = require("../../models");


router.get("/",authToken, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getContactId));

router.post("/",authToken, validation(contactJoiSchema),ctrlWrapper( ctrl.getPost));

router.delete("/:contactId", ctrlWrapper(ctrl.getDelete));

router.put("/:contactId", validation(contactSchemaUpdate),ctrlWrapper( ctrl.getPost));

router.patch("/:contactId/favorite", validation(favoriteSchema),ctrlWrapper(ctrl.getPatch));

module.exports = router;
