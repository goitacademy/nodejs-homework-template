const multer = require('multer')
const path = require('path')
const uuid = require('uuid')

const tempDir = path.join(__dirname, '../', 'temp')

const multerConfig = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, tempDir)
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname + '-' + uuid.v4())
	},
	limits: {
		fileSize: 4000,
	},
})

const upload = multer({
	storage: multerConfig,
})

module.exports = upload
