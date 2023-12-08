import express from 'express';
import contactController from '../../controllers/contact-controller.js';
import { isEmptyBody, isValidId } from '../../middleware/index.js';

const router = express.Router();

router.get('/', contactController.getAll);

router.get('/:id', isValidId, contactController.getById);

router.post('/', isEmptyBody, contactController.add);

router.put('/:id', isValidId, isEmptyBody, contactController.updateById);

router.patch('/:id/favorite', isValidId, isEmptyBody, contactController.updateFavoriteById);

router.delete('/:id', isValidId, contactController.deleteById);


export default router;