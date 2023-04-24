const express = require("express");

const ctrl = require("../../controllers/contactsController");

// const { validationSchema } = require("../../schemas");
const { validationSchema } = require("../../models/contact");

const { validateBody, isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", isValidId, ctrl.getOneContactById);

router.post("/", validateBody(validationSchema), ctrl.addNewContact);

router.put("/:contactId", isValidId, validateBody(validationSchema), ctrl.updateById);

// router.delete("/:contactId",isValidId,  ctrl.deleteContact);

module.exports = router;
