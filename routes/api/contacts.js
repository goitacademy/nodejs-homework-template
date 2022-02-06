const express = require("express");
const { validation } = require("../../middleware");
const { joiContactSchema, favoriteJoiSchema } = require("../../models");
const {
  getContactsController,
  getContactByIdController,
  postContactController,
  deleteContactController,
  putContactController,
  updateFavoriteCtrl,
} = require("../../controllers/contacts");

const router = express.Router();

router.get("/", getContactsController);

router.get("/:contactId", getContactByIdController);

router.post("/", validation(joiContactSchema), postContactController);

router.delete("/:contactId", deleteContactController);

router.put("/:contactId", validation(joiContactSchema), putContactController);

router.patch("/:contactId/favorite", validation(favoriteJoiSchema), updateFavoriteCtrl);

module.exports = router;
