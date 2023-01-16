const express = require('express');


const {auth, validation, ctrlWrapper} = require("../../middlewares");
const { joiSchema, favoriteSchema } = require("../../models/contact")


const { contacts: ctrl } = require('../../controllers');




const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", auth, validation(joiSchema), ctrlWrapper(ctrl.add));

router.patch("/:id/favorite", validation(favoriteSchema), ctrlWrapper(ctrl.updateFavorite));

router.put("/:id", validation(joiSchema), ctrlWrapper(ctrl.updateById));

router.delete("/:id", ctrlWrapper(ctrl.remuveById))

module.exports = router;