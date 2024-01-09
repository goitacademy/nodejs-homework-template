const express = require("express");
const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contact");
const validateBodyStatusUpdate = require("../../middlewares/validateBodyStatusUpdate");
const { upload } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

// upload.fields([{name:"cover", maxCount:2}, {name:"avatar", maxCount: 1])
// upload.array("cover", 8)
router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  upload.single("avatar"),
  ctrl.createContact
);

router.delete("/:contactId", authenticate, isValidId, ctrl.removeContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBodyStatusUpdate(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
