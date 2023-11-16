const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/contacts');

//          GET

router.get('/', ctrl.getAll);

//          GET ID

router.get('/:contactId', ctrl.getContactById);

//         POST
router.post('/', ctrl.add);

// DELETE

router.delete('/:contactId', ctrl.deleteContact);

//             PUT

router.put('/:contactId', ctrl.updateContact);

module.exports = router;
