const fs = require('fs/promises')
const path = require('path')
const Jimp = require('jimp')

const { User } = require('../../models')


const avatarDir = path.join(__dirname, '../../public/avatars')
// console.log(avatarDir)

const updateAvatar = async (req, res) => {
//     const { _id } = req.user;
//   const result = await User.findById(_id)
//   // console.log(result)
//   if (result) {
//     res.json({email: result.email, subscription: result.subscription})
//   }
    const { path: tempPath, originalname } = req.file

    try {
        const {_id} = req.user
        // console.log(_id)

        const newName = `${_id.toString()}${originalname}`
        const uploadPath = path.join(avatarDir, newName)
        const file = await Jimp.read(tempPath)

        await file.resize(250, 250).write(tempPath)
        await fs.rename(tempPath, uploadPath)
        const avatarURL = `/avatars/${newName}`

        await User.findByIdAndUpdate(_id, { avatarURL })
        
        res.json({
            status: 'success',
            code: 200,
            data: {
                result:  avatarURL
            }
        })
    } catch (error) {
        throw new Error(error)
        
    }
    

}
module.exports = updateAvatar