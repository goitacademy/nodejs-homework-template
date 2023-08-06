const express = require("express");
const ctrl = require("../../controllers/contacts");
const {validateBody, isValidId, authenticate} = require("../../middlewares")
const { schemas } = require("../../models/contact");


const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get('/:contactId', authenticate, isValidId, ctrl.getById);

router.post('/', authenticate, validateBody(schemas.addSchema), ctrl.add);

router.put('/:contactId', authenticate, isValidId, validateBody(schemas.addSchema), ctrl.updateById);

router.patch('/:contactId/favorite', authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite);

router.delete('/:contactId', authenticate, isValidId, ctrl.deleteById);

module.exports = router;
