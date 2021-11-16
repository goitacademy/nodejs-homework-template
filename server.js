const express = require('express')
const app = express()
const PORT = 4321

// router
app.get('/api/contacts', (req, res) => {
  res.sendStatus(200)
})

app.listen(PORT, err => {
  if (err) console.error('Error at server Launch:', err)
  console.log('Server works at port ' + PORT)
})
