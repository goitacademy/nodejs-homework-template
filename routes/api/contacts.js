const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/contacts-controller.js");
const {
  addContactValidate,
  favoriteUpdate,
  isValidId,
  validToken,
} = require("../../middleware/validation/index.js");

router.use(validToken);

router.get("/", controllers.getAll);
router.get("/:contactId", isValidId, controllers.getById);
router.post("/", addContactValidate, controllers.add);

router.put(
  "/:contactId",
  isValidId,
  addContactValidate,
  controllers.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  favoriteUpdate,
  controllers.updateById
);

router.delete("/:contactId", isValidId, controllers.deleteById);

module.exports = router;
