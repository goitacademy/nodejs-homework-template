import { Router } from 'express';
import controller from '../../controller.js';

const router = Router();

router.get('/', controller.getAll);

router.get('/:contactId', controller.getById);

router.post('/', controller.add);

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// });

// router.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// });

export default router;