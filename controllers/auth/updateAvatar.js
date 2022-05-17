const fs = require('fs/promises')
const path = require('path')
const { User } = require('../../models')
const Jimp = require('jimp')

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars')

const updateAvatar = async (req, res) => {
	const { _id } = req.user
	const { path: tempUpload, originalname } = req.file
	const avatarName = `${_id}_${originalname}`
	const resultUpload = path.join(avatarsDir, avatarName)

	Jimp.read(tempUpload, (err, avatar) => {
		if (err) throw err
		avatar
			.cover(
				250,
				250,
				Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE
			)
			.write(resultUpload)
	})

	try {
		await fs.rename(tempUpload, resultUpload)
		const avatarURL = path.join('public', 'avatars', avatarName)
		await User.findByIdAndUpdate(req.user._id, { avatarURL })

		res.status(200).json({
			status: 'Success',
			avatarURL,
		})
	} catch (error) {
		await fs.unlink(tempUpload)
		throw error
	}
}

module.exports = updateAvatar
