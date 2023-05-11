const express = require("express");

const {
  getAll,
  getById,
  add,
  deleteById,
  updateById,
  updateFavorite,
} = require("../../controlles/contacts");

const { validateBody, auth } = require("../../middlewares");

const { schemas } = require("../../models/contactsMogoose");

const router = express.Router();

router.get("/", auth, getAll);

router.get("/:contactId", auth, getById);

router.post("/", auth, validateBody(schemas.addSchema), add);

router.delete("/:contactId", auth, deleteById);

router.put("/:contactId", auth, validateBody(schemas.addSchema), updateById);

router.patch(
  "/:contactId/favorite",
  auth,
  validateBody(schemas.contactsUpdateFavoriteSchema),
  updateFavorite
);

module.exports = router;
