const express = require('express');
const controllers = require("../../controllers/controllers");
const { isValidId } = require("../../middlewares/index");
const { authenticate } = require("../../middlewares/index");



const router = express.Router();

router.use(authenticate);

router.get('/', controllers.getAll);

router.get('/:id', isValidId, controllers.getContactById);

router.post('/', controllers.postContact);

router.delete('/:id', isValidId, controllers.deleteContact);

router.put('/:id', isValidId, controllers.putContact);

router.patch("/:id/favorite", isValidId, controllers.patchContact);

module.exports = router;


