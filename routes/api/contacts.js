const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const {  contactsSchema,updateSchema,updateFavoriteSchema } = require("../../models/contact");
const { validateBody,isValidId,updateFavoriteStatus } = require("../../middlewares");


router.get("/",ctrl.getAll );

router.get("/:contactId",isValidId,ctrl.getById);

router.post("/",validateBody(contactsSchema), ctrl.add);

router.delete("/:contactId", isValidId,ctrl.deleteById);

router.put("/:contactId", isValidId, validateBody(updateSchema), ctrl.updateById);

router.patch("/:contactId/favorite",isValidId, updateFavoriteStatus(updateFavoriteSchema),ctrl.updateStatusContact);

module.exports = router;
