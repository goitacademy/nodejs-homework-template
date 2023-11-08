const express = require("express");
const router = express.Router();
const operations = require("../../models/contacts");

const controller = require("../../controllers/index");
const errorHandler = require("../../helpers/errorHandler");
const isValidId = require("../../middlewares/isValidId");

router.get("/", errorHandler(controller.getAll));

router.get("/:contactId", isValidId, errorHandler(controller.getById));

router.post("/", errorHandler(controller.add));

router.delete("/:contactId", isValidId, errorHandler(controller.remove));

router.put("/:contactId", isValidId, errorHandler(controller.update));

router.patch(
  "/:contactId/favorite",
  isValidId,
  errorHandler(controller.updateFavorite)
);

module.exports = router;
