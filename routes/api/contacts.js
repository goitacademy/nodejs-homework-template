const express = require("express");
const validateBody = require("../../middleware/validateBody");
const {schemas}=require('../../models/contact');
const {ctrlWrapper}= require('../../helpers')
const { contacts } = require("../../controllers");
const { isValideId, isBodyForPatch, authentificate } = require("../../middleware");


const router = express.Router();

router.get("/", authentificate, ctrlWrapper(contacts.getAll));

router.get("/:id", authentificate, isValideId, ctrlWrapper(contacts.getById));

router.post("/", authentificate, validateBody(schemas.addSchema), ctrlWrapper(contacts.addContact));

router.delete("/:id", authentificate, isValideId, ctrlWrapper(contacts.deleteById));

router.put("/:id", authentificate, isValideId, validateBody(schemas.addSchema), ctrlWrapper(contacts.updateById));

router.patch("/:id/favorite", authentificate, isValideId, isBodyForPatch, validateBody(schemas.updateFavoriteSchema), ctrlWrapper(contacts.updateStatusContact));

module.exports = router;
