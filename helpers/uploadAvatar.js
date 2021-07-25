const cloudinary = require('cloudinary').v2

const uploadCloud = (pathFile) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(pathFile, {
            folder: 'Avatars',
            transformation: {
                width: 250,
                crop: 'fill'
            }
        },
            (error, result) => {
                console.log(result)
                if (error) {
                    reject(error)
                }
                if (result) {
                    resolve(result)
                }
            })
    })
}

module.exports = uploadCloud
