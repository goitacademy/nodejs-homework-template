const express = require('express');
const router = express.Router();
const upload = require('../../middleware/upload'); 
const userController = require('../../controllers/userController'); 


router.patch('/avatars', upload.single('avatar'), userController.updateAvatar);

module.exports = router;
