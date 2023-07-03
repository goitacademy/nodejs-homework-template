const express = require("express");

const ctrl = require("../../controllers/index");

const  validateBody = require("../../middlewares/validateBody");

const  isValidId = require("../../middlewares/isValidId");

const authentificate = require("../../middlewares/authenticate");

const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", authentificate, ctrl.getAll);

router.get("/:id", authentificate, isValidId, ctrl.getById);

router.post("/", authentificate, validateBody(schemas.addSchema), ctrl.add);

router.put("/:id", authentificate, isValidId, validateBody(schemas.addSchema), ctrl.updateById);

router.patch(
  "/:id/favorite",
  authentificate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

router.delete("/:id", authentificate, isValidId, ctrl.deleteById);

module.exports = router;
