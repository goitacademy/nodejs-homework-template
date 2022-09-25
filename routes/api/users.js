const { Router } = require("express");
const {
  validation,
  controllerWrapper: ctrlWrap,
} = require("../../middlewares");
const { joiSchema: usersSchema } = require("../../models/contact");

const { contactsController: ctrl } = require("../../controllers");

const router = Router();

router.get("/", ctrlWrap(ctrl.getAll));

router.get("/:contactId", ctrlWrap(ctrl.getById));

router.post("/", validation(usersSchema), ctrlWrap(ctrl.add));

router.delete("/:contactId", ctrlWrap(ctrl.remove));

router.put("/:contactId", validation(usersSchema), ctrlWrap(ctrl.update));

// router.patch(
//   "/:contactId/favorite",
//   validation(favoriteSchema),
//   ctrlWrap(ctrl.updateFavorite)
// );

module.exports = router;
