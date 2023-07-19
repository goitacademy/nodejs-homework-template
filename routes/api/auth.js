const express = require('express');
const controller = require('../../controllers');

const router = express.Router();


router.post("/register", controller.register);



module.exports = router