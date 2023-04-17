const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const {  contactsSchema,updateSchema,updateFavoriteSchema } = require("../../models/contact");
const { validateBody,isValidId } = require("../../middlewares");


router.get("/",ctrl.getAll );

router.get("/:id",isValidId,ctrl.getById);

router.post("/",validateBody(contactsSchema), ctrl.add);

router.delete("/:id", isValidId,ctrl.deleteById);

router.put("/:id", isValidId, validateBody(updateSchema), ctrl.updateById);

router.patch("/:id/favorite",isValidId, validateBody(updateFavoriteSchema),ctrl.updateStatusContact);

module.exports = router;
