const express = require('express');
const ctrl = require('../../controllers/authCtrl')
const router = express.Router();

router.post('/register', ctrl.register );
router.post('/login', () => { });

module.exports = router;