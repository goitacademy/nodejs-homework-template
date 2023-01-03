const express = require("express");

const router = express.Router();

const { joiSchema, joiFavoriteSchema } = require("../../models/contacts");

const {
  validation,
  ctrlWrapper,
  isValideId,
  validationFavorite,
} = require("../../middlewares");

const { contacts: ctrl } = require("../../controllers");

router.get("/", ctrlWrapper(ctrl.getContacts));

router.get("/:contactId", isValideId, ctrlWrapper(ctrl.getByid));
//
router.post("/", validation(joiSchema), ctrlWrapper(ctrl.addPost));

router.delete("/:contactId", isValideId, ctrlWrapper(ctrl.remove));

router.put(
  "/:contactId",
  validation(joiSchema),
  isValideId,
  ctrlWrapper(ctrl.update)
);
router.patch(
  "/:contactId/favorite",
  isValideId,
  validationFavorite(joiFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
