const express = require("express");

// const isValidId = require("../../middlewares/isValidId");

const validation = require("../../middlewares/contactsValidation");

const schema = require("../../schemas/contactsSchema");

const favoriteSchema = require("../../schemas/favoriteContactSchema");

const ctrl = require("../../controllers/contactsControllers");

const router = express.Router();

router.get("/", ctrl.getAllItems);

router.get("/:contactId", ctrl.getItemById);

router.post("/", validation(schema), ctrl.addItem);

router.delete("/:contactId", ctrl.deleteItem);

router.put("/:contactId", validation(schema), ctrl.updateItem);

router.patch(
  "/:contactId/favorite",
  validation(favoriteSchema),
  ctrl.updateStatusItem
);

module.exports = router;
