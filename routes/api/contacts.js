const express = require("express")

const { getAll, getById, add, removeById, updateById, updateByFavorite } = require('../../controllers/contacts')
const { validateBody, isValidId, authenticate } = require('../../middlewares')
const { bodySchema, updateByFavoriteSchema } = require('../../schemas/contacts')

const router = express.Router()

router.get("/", authenticate, getAll)
router.get("/:contactId", authenticate, isValidId, getById)
router.post("/", authenticate, validateBody(bodySchema), add)
router.delete("/:contactId", authenticate, isValidId, removeById)
router.put("/:contactId", authenticate, isValidId, validateBody(bodySchema), updateById)
router.patch("/:contactId/favorite", authenticate, isValidId, validateBody(updateByFavoriteSchema), updateByFavorite)

module.exports = router