const express = require("express");

const ctrl = require("../../controllers/contacts");

const {validateBody} = require("../../middleware");

const {schemas} = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/",  ctrl.add);

router.delete("/:id", ctrl.deleteById);

// router.patch("/:id/favorite", validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite);

router.put("/:id", validateBody(schemas.addSchema),  ctrl.updateById);

module.exports = router;
