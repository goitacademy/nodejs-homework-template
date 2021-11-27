const express = require('express')
const router = express.Router()
const boardsController = require('../../controllers/boardsController.js')
const authMiddleware = require('../../middlewares/authMiddleware.js')

router.get('/', boardsController.listBoards)
router.put('/:id', boardsController.changeBoard)
router.post('/:id', boardsController.addTask)
router.delete('/:id/tasks/:taskId', boardsController.deleteTask)
// router.get('/:id', contactsController.getContactById)
// router.put('/:id', contactsController.updateContact)
// router.post('/', contactsController.addContact)
// router.delete('/:id', contactsController.removeContact)
// router.patch('/:id/favorite', contactsController.updateContactStatus)

module.exports = router