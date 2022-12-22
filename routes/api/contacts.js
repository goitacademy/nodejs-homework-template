const express = require("express");
const router = express.Router();

const {
  getAll,
  getById,
  addItem,
  removeItem,
  updateItem,
  updateFavoriteField,
} = require("../../controllers/contacts");
const controllerWrapper = require("../../helpers/controllerWrapper");
const { authenticate } = require("../../middlewars");

router.get("/", authenticate, controllerWrapper(getAll));

router.get("/:contactId", authenticate, controllerWrapper(getById));

router.post("/", authenticate, controllerWrapper(addItem));

router.delete("/:contactId", authenticate, controllerWrapper(removeItem));

router.put("/:contactId", authenticate, controllerWrapper(updateItem));

router.patch(
  "/:contactId/favorite",
  authenticate,
  controllerWrapper(updateFavoriteField)
);

module.exports = router;
