const express = require("express");

const ctrl = require("../../controllers/contactsController");

const { validationSchema } = require("../../schemas");

const { validateBody } = require("../../middlewares");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getOneContactById);

router.post("/", validateBody(validationSchema), ctrl.addNewContact);

router.put("/:contactId", validateBody(validationSchema), ctrl.updateById);

router.delete("/:contactId", ctrl.deleteContact);

module.exports = router;
