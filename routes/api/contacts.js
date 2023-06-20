const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts");

const {validateBody, isValidId} = require("../../middlewares")
const {schemas} = require("../../models/contact")


router.get("/",ctrl.getAll);
router.get("/:contactId", isValidId, ctrl.getById);
router.post("/", validateBody(schemas.validateContact), ctrl.add);
router.put("/:contactId", isValidId, validateBody(schemas.validateContact), ctrl.updateById);
router.delete("/:contactId", isValidId, ctrl.dellete);
router.patch("/:contactId/favorite", isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateStatusContact);

module.exports = router;
