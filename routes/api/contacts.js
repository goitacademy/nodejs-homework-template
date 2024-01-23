const express = require("express");
const { schemas } = require("../../models/contact");
const ctrl = require("../../controllers/contacts.js");
const { isValidId, validateBody } = require("../../middlewares");

const router = express.Router();

router.get("/", ctrl.getAll);

// router.get("/:id", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

// router.delete("/:id", isValidId, ctrl.deleteContact);

// router.put(
//   "/:id",
//   isValidId,
//   validateBody(schemas.putSchema),
//   ctrl.updateContact
// );

// router.patch(
//   "/:id/favorite",
//   isValidId,
//   validateBody(schemas.patchSchema),
//   ctrl.updateFavorite
// );

module.exports = router;
