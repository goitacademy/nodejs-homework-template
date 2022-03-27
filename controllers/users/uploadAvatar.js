const Storage = require('../../services/file-storage');

const uploadAvatar = async (req, res) => {
    
    try {

        const storageService = new Storage(req.file.path,req.file.filename,req.user);
        const urlAvatar = await storageService.updateAvatar();
        res.status(200).json({status: 'Success', code:200, data: {urlAvatar} })


    } catch (error) {
        res.status(401).json({status:'Error', code:401, message:"Not authorized"})
    }
}

module.exports = uploadAvatar;