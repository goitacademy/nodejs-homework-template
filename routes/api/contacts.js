const express = require("express");
const router = express.Router();
<<<<<<< HEAD

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
=======
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
>>>>>>> f897728d66c7cfeaa230c21584b96a891cbf5b99
  isValidId,
  errorHandler(controller.updateFavorite)
);

module.exports = router;