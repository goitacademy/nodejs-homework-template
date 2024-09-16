const express = require("express");

const {contacts: ctrl} = require("../../controllers");
 const {joiSchema, updateFavoriteSchema} = require("../../models/contact");

 const {auth, validation, ctrlWrapper} = require("../../middlewares");
 
const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.listContacts));


 router.get("/:contactId", ctrlWrapper(ctrl.getById));

 router.post("/", auth, validation(joiSchema), ctrlWrapper(ctrl.add));


 router.put("/:contactId", validation(joiSchema), ctrlWrapper(ctrl.updateById));

 router.patch("/:contactId/favorite", validation(updateFavoriteSchema), ctrlWrapper(ctrl.updateFavorite));

 router.delete("/:contactId", ctrlWrapper(ctrl.deleteById));

module.exports = router;