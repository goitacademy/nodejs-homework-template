const express = require("express");
const router = express.Router();
const contactController = require("../../controllers/contact-controller");
const isValidId = require("../../middlewares/isValidId");

router.get("/", contactController.GetAll);

router.get("/:id", isValidId, contactController.GetById);

router.post("/", contactController.AddContact);

router.put("/:contactId", isValidId, contactController.UpdateById);

router.patch(
  "/:contactId/favorite",
  isValidId,
  contactController.UpdateFavoriteById
);

module.exports = router;
