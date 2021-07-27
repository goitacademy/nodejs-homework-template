const express = require('express');
const { authtenticate } = require('../../middleware');
const { users: ctrl } = require('../../controllers');
console.log(ctrl, 'done-userApi');

const router = express.Router;

router.get('/current', express.json(), authtenticate, ctrl.getUser);

module.exports = router;
