import express from 'express';
import { deleteContact, getAll, getById, patchFavorite, postContact, putContact } from '../../controllers/contacts.js';
import { cntrlTryCatchWrapper } from '../../helpers/cntrlTryCatchWrapper.js';

const router = express.Router();

router.get('/', cntrlTryCatchWrapper(getAll));
router.get('/:contactId', cntrlTryCatchWrapper(getById));
router.post('/', cntrlTryCatchWrapper(postContact));
router.delete('/:contactId', cntrlTryCatchWrapper(deleteContact));
router.put('/:contactId', cntrlTryCatchWrapper(putContact));
router.patch('/:contactId/favorite', cntrlTryCatchWrapper(patchFavorite))

export default router;