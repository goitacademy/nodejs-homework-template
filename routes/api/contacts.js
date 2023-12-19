import { Router } from 'express';
import controller from '../../controller.js';

import { isEmptyBody } from "../../middlewares/index.js";

const router = Router();

router.get('/', controller.getAll);

router.get('/:contactId', controller.getById);

router.post('/', isEmptyBody, controller.add);

router.put('/:contactId', isEmptyBody, controller.updateById);

router.delete('/:contactId', controller.removeContact );



export default router;