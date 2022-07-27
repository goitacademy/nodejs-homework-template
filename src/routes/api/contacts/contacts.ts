"use strict"

import { Router } from 'express';
import ctrls from '../../../controllers/contacts';
import ctrlTryCatchWrapper from '../../../helpers/ctrlTryCatchWrapper';

const router = Router();

router.get("/", ctrlTryCatchWrapper(ctrls.getAll));

router.get('/:contactId', ctrlTryCatchWrapper(ctrls.getById));

router.post("/", ctrlTryCatchWrapper(ctrls.add));

router.put('/:contactId', ctrlTryCatchWrapper(ctrls.putById));

router.delete('/:contactId', ctrlTryCatchWrapper(ctrls.removeById));

router.patch('/:contactId/favorite', ctrlTryCatchWrapper(ctrls.updateStatusContact));

export default router;
