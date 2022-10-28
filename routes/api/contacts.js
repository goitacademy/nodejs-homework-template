const express = require("express");

// contacts controllers
const ctrl = require("../../controllers/contacts");

// try-catch wrapper
const { ctrlWrapper } = require("../../helpers");

// validate request body and ID
const { validateBody, isValidId } = require("../../middlewares");

// Joi validate Schema
const { joiSchema } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", validateBody(joiSchema.addSchema), ctrlWrapper(ctrl.add));

router.put(
  "/:contactId",
  isValidId,
  validateBody(joiSchema.addSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(joiSchema.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

module.exports = router;
