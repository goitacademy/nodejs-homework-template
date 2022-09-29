const { Router } = require("express");
const {
  validation,
  controllerWrapper: ctrlWrap,
  auth,
} = require("../../middlewares");
const {
  joiSchema: contactsSchema,
  favoriteSchema,
} = require("../../models/contact");

const { contactsController: ctrl } = require("../../controllers");

const router = Router();

router.get("/", ctrlWrap(auth), ctrlWrap(ctrl.getAll));

router.get("/:contactId", ctrlWrap(ctrl.getById));

router.post("/", validation(contactsSchema), ctrlWrap(ctrl.add));

router.delete("/:contactId", ctrlWrap(ctrl.remove));

router.put("/:contactId", validation(contactsSchema), ctrlWrap(ctrl.update));

router.patch(
  "/:contactId/favorite",
  validation(favoriteSchema),
  ctrlWrap(ctrl.updateFavorite)
);

module.exports = router;
