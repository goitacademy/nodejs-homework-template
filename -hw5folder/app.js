const express = require('express')
const cors = require('cors')

const { contactsRouter } = require('./routes/api')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('public')) // настройка статичного файла(які мають розширення .???), тбто шукайте в папці 'public'
// app.use(express.static(path.join(__dirname, '../../', 'public'));

app.use('/api/v1/contacts', contactsRouter)

app.use((_, res) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Not found',
  })
})

app.use((error, _, res, __) => {
  const { status = 500, message = 'Server error' } = error
  res.status(status).json({
    status: 'error',
    code: status,
    message,
  })
})
module.exports = app
