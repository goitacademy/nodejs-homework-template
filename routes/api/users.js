const express = require('express');
const router = express.Router();
const userControllers = require('../../controllers/users');
const guard = require('../../helpers/guard')

router.get('/current', guard, userControllers.current) 
router.patch('/', guard, userControllers.updateSub) 


module.exports = router
