const express = require("express");

const ctrl = require("../../controllers/contacts");

const { isValidId, authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, ctrl.listContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getContactById);

router.post("/", authenticate, ctrl.add);

router.put("/:contactId", authenticate, isValidId, ctrl.updateById);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  ctrl.updateFavorite
);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteById);

module.exports = router;
