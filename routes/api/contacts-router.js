import express from 'express';
import contactController from '../../controllers/contacts-controllers.js';
import { isEmptyBody } from '../../middlewares/index.js';

const router = express.Router();

router.get('/', contactController.getAll);

router.get('/:id', contactController.getById);

router.post('/', isEmptyBody, contactController.add);

router.delete('/:id', contactController.deleteById);

router.put('/:id', isEmptyBody, contactController.updateById);

export default router;
