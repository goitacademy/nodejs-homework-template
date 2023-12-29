const express = require("express")

const { getAll, getById, add, removeById, updateById, updateByFavorite } = require('../../controllers/index')
const { validateBody, isValidId } = require('../../middlewares')
const { bodySchema, updateByFavoriteSchema } = require('../../schemas')

const router = express.Router()

router.get("/", getAll)
router.get("/:contactId", isValidId, getById)
router.post("/", validateBody(bodySchema), add)
router.delete("/:contactId", isValidId, removeById)
router.put("/:contactId", isValidId, validateBody(bodySchema), updateById)
router.patch("/:contactId/favorite", isValidId, validateBody(updateByFavoriteSchema), updateByFavorite)

module.exports = router