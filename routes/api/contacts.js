const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const {
  contactAddSchema,
  contactUpdateSchema,
} = require("../../contactsSchemas/contacts");

const validateBody = require("../../middlewares/validateBody");

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/", validateBody(contactAddSchema), ctrl.add);

router.delete("/:id", ctrl.deleteById);

router.put("/:contactId", validateBody(contactUpdateSchema), ctrl.updateById);

module.exports = router;
