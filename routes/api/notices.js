const express = require('express')
const router = express.Router()
const {filterNotices, listNotices, getNoticeById, removeNotice, addNotice, updateStatusContact, getAllNotices} = require('../../controllers/index')
const authenticate = require('../../middlewares/authMiddleware');

router.get('/', getAllNotices)

router.get('/search', filterNotices)

router.get('/:id', getNoticeById)

router.post('/', authenticate, addNotice)

router.delete('/:id', authenticate, removeNotice)

router.get('/owner', authenticate, listNotices)

router.put('/:id/favorite', authenticate, updateStatusContact)


module.exports = router