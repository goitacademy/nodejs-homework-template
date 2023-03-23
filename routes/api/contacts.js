const express = require("express");
const controllers = require("../../controllers/contacts");
const isValidId = require("../../middlewares/isValidId");
const validateBody = require("../../middlewares/validateBody");
const { schema, updateFavoriteScheme } = require("../../models/contact");

const router = express.Router();

router.get("/", controllers.getAll);

router.get("/:contactId", isValidId, controllers.getById);

router.post("/", validateBody(schema), controllers.updateFavorit);

router.delete("/:contactId", isValidId, controllers.removeById);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schema),
  controllers.updateById
);

router.patch(
  "/:contactId/favorit",
  isValidId,
  validateBody(updateFavoriteScheme),
  controllers.updateById
);

module.exports = router;
