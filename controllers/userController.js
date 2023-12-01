const fs = require('node:fs/promises');
const path = require('node:path');

const User = require('../models/user');

async function getAvatar(req, res, next) {
     try {
        const user = await User.findById(req.user.id).exec();
        if(user === null){
            return res.status(404).send({message: "User not found"});
        }
        if(user.avatar===null){
            return res.status(404).send({message: "Avatar  not found"});
        }
        // console.log(user);

        res.sendFile(path.join(__dirname, "..", "public/avatars", user.avatar));
     } catch (error) {
        next(error);
     }
}

async function uploadAvatar(req, res, next) {
    try {
        const pathAvatar = path.join(__dirname, "..", "public/avatars", req.file.filename);
    await fs.rename(req.file.path, pathAvatar);

    const user = await  User.findByIdAndUpdate(
        req.user.id, 
        {avatar: req.file.filename}, 
        {new: true}
        ).exec();

        if(user === null){
            return res.status(404).send({message: "User not found"});
        }

    res.send(user); 
 
    } catch (error) {
        next(error);
    }
    
}
 
module.exports = { getAvatar, uploadAvatar };
