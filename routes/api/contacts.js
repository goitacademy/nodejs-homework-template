const express = require("express");

const ctrl = require("../../controllers/contact");

const {
    validateBody,
    isValidId,
    validateFavorite,
} = require("../../middleWares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", ctrl.add);

router.post("/", validateBody(schemas.addschema), ctrl.add);

router.delete("/:contactId", isValidId, ctrl.deleteById);

router.put(
    "/:contactId",
    isValidId,
    validateFavorite,
    validateBody(schemas.addschema),
    ctrl.update
);
router.patch(
    "/:contactId/favorite",
    isValidId,

    validateBody(schemas.updateFavoriteSchema),
    ctrl.updateFavorite
);

module.exports = router;