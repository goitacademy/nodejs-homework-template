const express = require("express");
const isContactOwner = require('../../middlewares/contactOwner');

const { getAll, getById, add, removeById, updateById, updateByFavorite } = require('../../controllers/contacts');
const { validateBody, isValidId, authenticate } = require('../../middlewares');
const { bodySchema, updateByFavoriteSchema } = require('../../schemas/contacts');


const router = express.Router();

router.get("/", authenticate, getAll);
router.get("/:contactId", authenticate, isValidId, isContactOwner, getById);
router.post("/", authenticate, validateBody(bodySchema),add);
router.delete("/:contactId", authenticate, isValidId, isContactOwner, removeById);
router.put("/:contactId", authenticate, isValidId, isContactOwner, validateBody(bodySchema), updateById);
router.patch("/:contactId/favorite", authenticate,  isValidId, isContactOwner, validateBody(updateByFavoriteSchema),updateByFavorite);

module.exports = router;
