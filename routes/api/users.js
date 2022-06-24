const express = require('express');
const router = express.Router();
const { auth, upload } = require('../../middlewares');
const {updateUser} = require('../../services/user.service');
const {uploadImage} = require('../../services/image.service')

router.patch('/avatars', auth, upload.single('avatar'), async (req, res, next) => {
    try {
        const {_id: id} = req.user;
        const avatarURL = await uploadImage(id, req.file);
        await updateUser(id, {avatarURL});

        res.json({avatarURL});
    } catch (e) {
        next(e);
    }
});

module.exports = router;