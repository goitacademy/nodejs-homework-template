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
const { auth } = require("../../middlewawes/authMiddlevares");
const { ctrlWrapper } = require("../../helpers/ctrlWrapper");

const router = express.Router();

router.get("/", auth, ctrlWrapper(getContacts));

router.get("/:contactId", auth, ctrlWrapper(getContById));

router.post("/", auth, postValidationMiddleware, ctrlWrapper(addCont));

router.delete("/:contactId", auth, ctrlWrapper(removeCont));

router.put(
  "/:contactId",
  auth,
  putValidationMiddleware,
  ctrlWrapper(updateCont)
);

router.patch("/:contactId/favorite", auth, ctrlWrapper(updateFavorite));

module.exports = router;
