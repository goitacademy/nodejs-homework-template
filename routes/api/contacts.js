// const express = require('express');
// const ctrl = require('../../controllers/contacts');
// const {validateBody, isValidId} = require('../../middlewares')
// const { shemas } = require('../../models/contact')

// const router = express.Router()


// router.get('/', ctrl.getAll )

// router.get('/:contactId', isValidId, ctrl.getById)

// router.post('/',  validateBody(shemas.addSchema),  ctrl.add )

// router.delete('/:contactId', isValidId, ctrl.deleteById)

// router.put('/:contactId', validateBody(shemas.addSchema), isValidId, ctrl.update)

// router.patch('/:contactId/favorite', validateBody(shemas.isFavoriteSchema), isValidId, ctrl.updateFavorite)


// module.exports = router;

const express = require("express");

const ctrl = require("../../controllers/contacts");

const {validateBody, isValidId} = require("../../middlewares");

const {schemas} = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:id", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.add);

router.put("/:id", isValidId, validateBody(schemas.addSchema), ctrl.updateById);

router.patch("/:id/favorite", isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite);

router.delete("/:id", isValidId, ctrl.deleteById);

module.exports = router;