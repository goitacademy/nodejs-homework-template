import express from 'express';
import { deleteContact, getAll, getById, updateStatusContact, postContact, putContact } from '../../controllers/contacts.js';
import { cntrlTryCatchWrapper } from '../../helpers/cntrlTryCatchWrapper.js';
import { isValidId } from '../../middlewares/isValidId.js';

const router = express.Router();

router.get('/', cntrlTryCatchWrapper(getAll));
router.get('/:contactId', isValidId, cntrlTryCatchWrapper(getById));
router.post('/', cntrlTryCatchWrapper(postContact));
router.delete('/:contactId', isValidId, cntrlTryCatchWrapper(deleteContact));
router.put('/:contactId', isValidId, cntrlTryCatchWrapper(putContact));
router.patch('/:contactId/favorite', isValidId, cntrlTryCatchWrapper(updateStatusContact))

export default router;