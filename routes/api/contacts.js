const express = require('express');

const router = express.Router();

const { authorization, validation } = require('../../middlewares');
const { schemas } = require('../../models/contact');
const { ctrlWrapper } = require('../../helpers');
const controllers = require('../../controllers/contacts');

router.get('/', authorization, ctrlWrapper(controllers.getAll));

router.get('/:contactId', ctrlWrapper(controllers.getById));

router.post(
  '/',
  authorization,
  validation(schemas.add),
  ctrlWrapper(controllers.add)
);

router.delete('/:contactId', ctrlWrapper(controllers.removeById));

router.put(
  '/:contactId',
  validation(schemas.add),
  ctrlWrapper(controllers.updateById)
);

router.patch(
  '/:contactId/favorite',
  validation(schemas.update),
  ctrlWrapper(controllers.updateOneById)
);

module.exports = router;
