const fs = require('fs/promises');

const ctrlWrapper = require('../../utils/ctrlWrapper');


const uploadUserAvatar = async(req, res) => {

    await fs.rename(tempDirUpload, finalUpload);
    res.json({avatarURL});


}


module.exports = {uploadUserAvatar: ctrlWrapper(uploadUserAvatar)};