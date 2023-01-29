const express = require("express");
const router = express.Router();

const { joiSchema, updateFavoriteSchema } = require("../../models/contacts");
const { joyValidation, isValidId } = require("../../middleware/index");
const validateJoiMiddleware = joyValidation(joiSchema);
const updateJoiFavoriteSchema = joyValidation(updateFavoriteSchema);

const { getAll, getById, addById, updateById, deleteById, updateFavorite } = require("../../controllers/index");
router.get("/", getAll);
router.get('/:contactId',isValidId,  getById);
router.post("/", validateJoiMiddleware, addById);
router.put('/:contactId', isValidId, validateJoiMiddleware, updateById);
router.patch('/:contactId/favorite',isValidId,  updateJoiFavoriteSchema, updateFavorite);
router.delete('/:contactId', isValidId, deleteById);


module.exports = router;
