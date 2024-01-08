const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');
const { User } = require('../../models');
const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");

const updateAvatar = async(req, res) => {
    const {_id} = req.user;
    if(!req.file) {
        res.status(400).json("File upload error")
    }
}