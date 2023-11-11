const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/api/contacts')
const {authRouter} = require("./routes/api/auth")

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)
app.use("/api/users", authRouter);

app.use((req, res) => {
  return res.status(404).json({ message: "Not found!" });
});

app.use((err, req, res, next) => {
  if (err.message.includes("Cast to ObjectId failed for value")) {
    return res.status(400).json({
      message: "id is invalid",
    });
}

return res.status(err.status || 500).json({ message: err.message });
});

module.exports = app