const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, clbk) => {
        const temporaryStoragePath = path.join(process.cwd(), '/tmp')
        clbk(null, temporaryStoragePath)
    },
    filename: (req, file, clbk) => {
        const extention = file.mimetype.split('/')[1]
        const fileNameToSave = `${req.user._id}-avatar.${extention}`
        clbk(null, fileNameToSave)
    }
})


const avatarUpload = multer({
    storage: storage
}).single('avatar')



module.exports = avatarUpload 