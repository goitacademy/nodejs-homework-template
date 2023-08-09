const express = require("express");
const validateBody = require("../../middleware/validateBody");
const {schemas}=require('../../models/contact');
const {ctrlWrapper}= require('../../helpers')
const { getAll, getById, addContact, deleteById, updateById, updateStatusContact } = require("../../controllers");
const { isValideId, isBodyForPatch } = require("../../middleware");

const router = express.Router();

router.get("/", ctrlWrapper(getAll));

router.get("/:id", isValideId, ctrlWrapper(getById));

router.post("/", validateBody(schemas.addSchema), ctrlWrapper(addContact));

router.delete("/:id", isValideId, ctrlWrapper(deleteById));

router.put("/:id", isValideId, validateBody(schemas.addSchema), ctrlWrapper(updateById));

router.patch("/:id/favorite", isValideId, isBodyForPatch, validateBody(schemas.updateFavoriteSchema), ctrlWrapper(updateStatusContact));

module.exports = router;
