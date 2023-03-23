const { Router } = require('express');

const { contacts: ctrl } = require('../../controllers');

const { contactMiddleware: mdlwr } = require('../../middlewares');

const router = Router();

router.post('/', mdlwr.checkCreateContactData, ctrl.addContact);
router.get('/', ctrl.listContacts);
router.get('/:id', mdlwr.checkContactId, ctrl.getContactById);
router.patch('/:id',  mdlwr.checkUpdateContactData, ctrl.updateContact);
router.patch('/:id/favorite',  mdlwr.checkContactId, mdlwr.checkFavoriteContactData, ctrl.updateStatusContact);
router.delete('/:id', mdlwr.checkContactId, ctrl.removeContact);

module.exports = router;
