const express = require("express");

const ctrl = require("../../controllers/contacts");


const { validateBody, isValidId, authenticate } = require("../../middlewares");


const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrl.getAllContacts);


router.get("/:id", authenticate, isValidId, ctrl.getById);


router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.add);


router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateById
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

router.delete("/:id", isValidId, ctrl.deleteById);

module.exports = router;
