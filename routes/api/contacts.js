const express = require("express");
const {
  getAll,
  getById,
  addItem,
  removeItem,
  updateItem,
  updateFavoriteField,
} = require("../../controllers/contacts");
const controllerWrapper = require("../../helpers/controllerWrapper");

const router = express.Router();

router.get("/", controllerWrapper(getAll));

router.get("/:contactId", controllerWrapper(getById));

router.post("/", controllerWrapper(addItem));

router.delete("/:contactId", controllerWrapper(removeItem));

router.put("/:contactId", controllerWrapper(updateItem));

router.patch("/:contactId/favorite", controllerWrapper(updateFavoriteField));

module.exports = router;
