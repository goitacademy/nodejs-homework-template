
const express = require('express');
const checkId = require('../../controllers/checkId');
const createContact = require('../../controllers/createContact');
const removeContactController = require('../../controllers/deleteContacts');
const getList = require('../../controllers/getList');
const updateFavorite = require('../../controllers/updateFavorite');
const {protectMiddleware, allowFor} = require('../../middleware/authMiddleware');
const checkMiddlewar = require('../../middleware/checkIdMiddleware');
=======
const express = require('express')


const router = express.Router();
router.use(protectMiddleware)


router.get('/', getList)
=======
router.get('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})


router.get('/:id', checkMiddlewar ,checkId)
router.use(allowFor('admin'))
router.post('/', createContact)

router.delete('/:id',checkMiddlewar,removeContactController)

router.patch('/:id/favorite',checkMiddlewar, updateFavorite)

module.exports = router
