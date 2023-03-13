const express = require('express')

const { contacts: ctrl } = require("../../../controllers")
const { validation, ctrlWrapper } = require('../../../middlewares')
const { joiSchema, favoriteJoiSchema } = require('../../../models/contact')

const router = express.Router()

router.get("/", ctrlWrapper(ctrl.getAll))

router.get("/:id", ctrlWrapper(ctrl.getById))

router.post("/", validation(joiSchema), ctrlWrapper(ctrl.add))

router.put("/:id", validation(joiSchema), ctrlWrapper(ctrl.updateById))

router.patch("/:id/favorite",validation(favoriteJoiSchema), ctrlWrapper(ctrl.patchFavoriteById))

router.delete("/:id", ctrlWrapper(ctrl.deleteById))

module.exports = router