const express = require("express");
const router = express.Router();

const { contacts: controller } = require("../../controllers/index");
const errorHandler = require("../../helpers/errorHandler");
const isValidId = require("../../middlewares/isValidId");
const auth = require("../../middlewares/auth");

router.get("/", auth, errorHandler(controller.getAll));

router.get("/:contactId", auth, isValidId, errorHandler(controller.getById));

router.post("/", auth, errorHandler(controller.add));

router.delete("/:contactId", auth, isValidId, errorHandler(controller.remove));

router.put("/:contactId", auth, isValidId, errorHandler(controller.update));

router.patch(
  "/:contactId/favorite",
  auth,
  isValidId,
  errorHandler(controller.updateFavorite)
);

module.exports = router;