const express = require('express');


const { viewControllers } = require('../../controllers');

const router = express.Router();

router.get('/home', viewControllers.home);
router.get('/todos', viewControllers.todos);

module.exports = router