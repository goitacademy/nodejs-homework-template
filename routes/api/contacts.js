const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

// const {schemas } = require("../../schemas/contacts");

// const { validateBody ,isValidId } = require("../../middlewares");

router.get("/", ctrl.listContacts);

// router.get("/:id", isValidId, ctrl.getContactById);

// router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

// router.delete("/:id", isValidId, ctrl.removeContact);

// router.put(
//   "/:id",
//   validateBody(schemas.addSchema),
//   isValidId,
//   ctrl.updateContactById
// );

// router.patch(
//   "/:id/favorite",
//   isValidId,
//   validateBody(schemas.updateFavorite),
//   ctrl.favoriteContact
// );
// router.patch(
//   "/:id/favorite",
//   isValidId,
//   validateBody(schemas.updateFavoriteSchema),
//   ctrl.updateFavorite
// );

module.exports = router;
