"use strict"

import { Router } from 'express';
import ctrls from '../../../controllers/contacts';
import ctrlTryCatchWrapper from '../../../helpers/ctrlTryCatchWrapper';
import { auth } from '../../../middlewares/auth';
const router = Router();

router.get("/", auth, ctrlTryCatchWrapper(ctrls.getAll));

router.get('/:contactId', auth, ctrlTryCatchWrapper(ctrls.getById));

router.post("/", auth, ctrlTryCatchWrapper(ctrls.add));

router.put('/:contactId', auth, ctrlTryCatchWrapper(ctrls.putById));

router.delete('/:contactId', auth, ctrlTryCatchWrapper(ctrls.removeById));

router.patch('/:contactId/favorite', auth, ctrlTryCatchWrapper(ctrls.updateStatusContact));

export default router;
