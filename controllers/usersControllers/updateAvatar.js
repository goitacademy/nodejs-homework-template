const User = require("../../models/users");
const fs = require('fs/promises');
const path = require('path');
const jimp = require('jimp');
const { HttpError } = require("../../helpers");

const avatarDir = path.join(__dirname, '../../', 'public', 'avatars')

const updateAvatar = async (req, res) => {
    // console.log(`req.file ${req.file}`)
    const { path: tempUpload, originalname } = req.file;
    const { _id } = req.user;

    if (!tempUpload||!originalname) {
      throw HttpError(401, `No new avatars for ${_id}`)
    }

    
    const filename = `${_id}_${originalname}`;
    console.log(filename)
    const resultUpload = path.join(avatarDir, filename);
    
    await fs.rename(tempUpload, resultUpload);
    jimp.read(resultUpload)
        .then(file => {
            return file.resize(250, 250)
            .write(resultUpload)
        })
        .catch(err => {
            console.log(err)
        })
            


    const avatarURL = path.join('avatars', filename);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({avatarURL})
}

module.exports =  updateAvatar