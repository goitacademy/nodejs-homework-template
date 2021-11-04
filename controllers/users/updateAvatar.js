/* eslint-disable no-tabs */
const fs = require('fs/promises')
const { User } = require('../../models')
const path = require('path')
const { Unauthorized } = require('http-errors')
// const Jimp = require('jimp')

const updateAvatar = async(req, res, next) => {
	const { _id } = req.user
	const { path: tempDir, originalname } = req.file
	const [extension] = originalname.split('.').reverse()
	const filename = `${_id}.${extension}`
	const uploadDir = path.join(__dirname, '../../', 'public\\avatars', filename)

	if (!_id) {
		throw new Unauthorized('Not authorized')
	}

try {
	await fs.name(tempDir, uploadDir)
	const image = path.join('avatars', filename)
	await User.findByIdAndUpdate(_id, { avatarURL: image })
// try {
// await Jimp.read(filename).then(originalname => { return originalname.resize(250, 250).quality(60).write(filename) })
// } catch (error) => {
// 	console.log(error)
// }

	res.json({
		status: 'success',
		code: 201,
		message: 'Avatar was updated',
		data: {
			avatarURL: image,
		},
	})
} catch (error) {
	await fs.unlink(tempDir)
	next(error)
}
}

module.exports = updateAvatar
