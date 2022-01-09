import { Router } from 'express';
import operations from '../../model/contacts';
import { validateUpdate, validateId } from '../../middlewares/contacts/validation';

const router = new Router();

router.put('/:id', validateId, validateUpdate, async (req, res, next) => {
    const { id } = req.params;
    const contact = await operations.updateContact(id, req.body);
    if (contact) {
      return res.status(200).json(contact);
    }
    res.status(404).json({ "message": "Not found" })
});

export default router;