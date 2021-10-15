const express = require('express')
const cors = require('cors')
const logger = require('morgan')
// const multer = require('multer')
// const path = require('path')
// const { v4 } = require('uuid')
// const fs = require('fs/promises')
// const gravatar = require('gravatar')

// const tempDir = path.join(__dirname, '../', 'temp')
// const uploadDir = path.join(__dirname, 'public')

// const uploadConfig = multer.diskStorage({
//   distination: (req, file, cb) => {
//     cb(null, tempDir)
//   },
//   fileName: (req, file, cb) => {
//     cb(null, file.originalname)
//   },
//   limits: 2048
// })

// const uploadMiddleware = multer({
//   storege: uploadConfig
// })

const contactsRouter = require('./routes/api/contacts')
const authRouter = require('./routes/api/auth')
// const { contacts } = require('./controllers')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

// app.post('/api/contacts', uploadMiddleware.single('image'), async (req, res) => {
// console.log('req.body :>> ', req.body)
// console.log('req.file :>> ', req.file)
// const { originalname, path: tempName } = req.file
// const fileName = path.join(uploadDir, 'avatars', originalname)
// try {
//   await fs.rename(tempName, fileName)
//   const filePath = path.join('/avatars', originalname)
//   const newContact = { ...req.body, id: v4(), image: filePath }
//   contacts.push(newContact)
//   res.status(201).json({
//     status: 'succes',
//     code: 201,
//     data: {
//       result: contacts
//     }
//   })
// } catch (error) {
//   await fs.unlink(tempName)
// }
// })

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use('/api/contacts', contactsRouter)
app.use('/api/v1/auth', authRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err
  res.status(status).json({ message })
})

module.exports = app
