const express = require("express");
const controllers = require("../../controllers/ControllContacts");
const validateBody = require("../../middlewares/validateBody");
const schemas = require("../../schemas/conatctsSchem");
const router = express.Router();

router.patch("/:contactId/favorite", controllers.updateFavorite);
router.get("/", controllers.getAll);
router.get("/:contactId", controllers.getById);
router.post(
  "/",
  validateBody(schemas.validationContact),
  controllers.addContacts
);
router.put(
  "/:contactId",
  validateBody(schemas.updateContactsSchema),
  controllers.updateById
);
router.delete("/:contactId", controllers.deleteContact);
module.exports = router;
