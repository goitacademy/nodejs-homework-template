const express = require("express");
const {
  addCont,
  getContacts,
  getContById,
  removeCont,
  updateCont,
  updateFavorite,
} = require("../../controllers/contactsController");
const {
  postValidationMiddleware,
  putValidationMiddleware,
} = require("../../middlewawes/validationMiddlevares");
const { ctrlWrapper } = require("../../helpers/ctrlWrapper");

const router = express.Router();

router.get("/", ctrlWrapper(getContacts));

router.get("/:contactId", ctrlWrapper(getContById));

router.post("/", postValidationMiddleware, ctrlWrapper(addCont));

router.delete("/:contactId", ctrlWrapper(removeCont));

router.put("/:contactId", putValidationMiddleware, ctrlWrapper(updateCont));

router.patch("/:contactId/favorite", ctrlWrapper(updateFavorite));

module.exports = router;
