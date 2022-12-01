const express = require("express");
const controllers = require("../../controllers/contacts");
const router = express.Router();
const { validationBody, isValidId } = require("../../middlewares");
const { joiSchema, joiChangeFavorite } = require("../../models/contact");

router.get("/", controllers.getAll);

router.get("/:id", isValidId, controllers.getById);

router.post("/", validationBody(joiSchema), controllers.addContact);

router.delete("/:id", isValidId, controllers.removeById);

router.put(
  "/:id",
  isValidId,
  validationBody(joiSchema),
  controllers.updateById
);

router.patch(
  "/:id/favorite",
  isValidId,
  validationBody(joiChangeFavorite),
  controllers.updateFavoriteById
);

module.exports = router;