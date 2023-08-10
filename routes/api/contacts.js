const express = require("express");
const ctrl = require("../../controllers/contact");

const { validateBody, isValidId, favoriteValidateStatus } = require("../../middlewares");
const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", ctrl.getAll);

 router.get("/:id", isValidId, ctrl.getById);

 router.post("/", validateBody(schemas.addSchema), ctrl.add);

 router.delete("/:id", isValidId, ctrl.remove);

 router.put("/:id", isValidId, validateBody(schemas.addSchema), ctrl.updateContact);

router.patch('/id/favorite', isValidId, favoriteValidateStatus, 
validateBody(schemas.updateFavoriteSchema),
ctrl.updateFavorite);

module.exports = router;
