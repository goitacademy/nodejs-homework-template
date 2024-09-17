const express = require('express')
const router = express.Router()
const {listPets, addPet, removePet} = require('../../controllers/index')
const authenticate = require('../../middlewares/authMiddleware');

router.get('/', authenticate, listPets)

router.post('/', authenticate, addPet)

router.delete('/:id', authenticate, removePet)

module.exports = router