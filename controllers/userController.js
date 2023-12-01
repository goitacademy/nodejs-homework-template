const fs = require('node:fs/promises');
const path = require('node:path');

const User = require('../models/user');

async function uploadAvatar(req, res, next) {
    try {
        const pathAvatar = path.join(__dirname, "..", "public/avatars", req.file.filename);
    await fs.rename(req.file.path, pathAvatar);

    console.log(req.user);

    res.send("Uploading avatar");
    } catch (error) {
        next(error);
    }
    
}
 
module.exports = {uploadAvatar};
