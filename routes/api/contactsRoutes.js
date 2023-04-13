const express = require("express");

const authenticate = require("../../middlewares/authorization");

const isValidId = require("../../middlewares/isValidId");

const validation = require("../../middlewares/validationContacts");

const schema = require("../../schemas/contactsSchema");

const favoriteSchema = require("../../schemas/favoriteContactSchema");

const ctrl = require("../../controllers/contactsControllers");

const router = express.Router();

router.get("/", authenticate, ctrl.getAllItems);

router.get("/:contactId", authenticate, isValidId, ctrl.getItemById);

router.post("/", authenticate, validation(schema), ctrl.addItem);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteItem);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validation(schema),
  ctrl.updateItem
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validation(favoriteSchema),
  ctrl.updateStatusItem
);

module.exports = router;
