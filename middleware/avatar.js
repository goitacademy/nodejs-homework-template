const multer = require('multer')
const path = require("node:path")
const crypto = require("node:crypto")

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, path.join(__dirname, "..", "tmp"))
	},
	filename: (_, file, cb) => {
		const extName = path.extname(file.originalname)
		const baseName = path.basename(file.originalname, extName)
		const name = `${baseName}-${crypto.randomUUID()}${extName}`
		cb(null, name)
	}
})

module.exports = multer({ storage })