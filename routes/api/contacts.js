const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { validateBody, validateId } = require("../../middlewares");

const schemes = require("../../schemes/contacts");

router.get("/", ctrl.getAll);

router.get("/:contactId", validateId, ctrl.getById);

router.post("/", validateBody(schemes.addSchema), ctrl.add);

router.delete("/:contactId", validateId,ctrl.remove);

router.put("/:contactId", validateBody(schemes.addSchema),validateId, ctrl.updateByID);

router.patch("/:contactId/favorite", validateBody(schemes.updateFavoriteSchema),validateId, ctrl.updateStatusContact);


module.exports = router;
