import express from 'express';
import contactController from '../../controllers/contacts-controllers.js';
import { isEmptyBody, isValidId } from '../../middlewares/index.js';

const router = express.Router();

router.get('/', contactController.getAll);

router.get('/:id', isValidId, contactController.getById);

router.post('/', isEmptyBody, contactController.add);

router.delete('/:id', isValidId, contactController.deleteById);

router.put('/:id', isValidId, isEmptyBody, contactController.updateById);

router.patch(
  '/:id/favorite',
  isValidId,
  isEmptyBody,
  contactController.updateStatusContact
);

export default router;
