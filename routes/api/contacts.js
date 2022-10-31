const express = require("express");

const router = express.Router();

const {
  addContact,
  listContacts,
  getContactById,
  removeContact,
  updateContact,
  updateFav,
} = require("../../controllers/contacts");
const { wrapper } = require("../../helpers/wrapper");
const { authenticate, validateBody, idValid } = require("../../middleware");
const { postSchema, putSchema } = require("../../validation/validation");

router.get("/", authenticate, wrapper(listContacts));

router.get("/:id", idValid, authenticate, wrapper(getContactById));

router.post("/", authenticate, validateBody(postSchema), wrapper(addContact));

router.delete("/:id", idValid, authenticate, wrapper(removeContact));

router.put(
  "/:id",
  idValid,
  authenticate,
  validateBody(putSchema),
  wrapper(updateContact)
);

router.patch("/:id/favorite", idValid, authenticate, wrapper(updateFav));

module.exports = router;
