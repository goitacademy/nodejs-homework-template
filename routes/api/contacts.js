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

router.get("/:contactId", ctrlWrap(auth), ctrlWrap(ctrl.getById));

router.post(
  "/",
  ctrlWrap(auth),
  validation(contactsSchema),
  ctrlWrap(ctrl.add)
);

router.delete("/:contactId", ctrlWrap(ctrl.remove));

router.put(
  "/:contactId",
  ctrlWrap(auth),
  validation(contactsSchema),
  ctrlWrap(ctrl.update)
);

router.patch(
  "/:contactId/favorite",
  ctrlWrap(auth),
  validation(favoriteSchema),
  ctrlWrap(ctrl.updateFavorite)
);

module.exports = router;
