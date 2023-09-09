const express = require('express')
const cors = require('cors');

const authRouter = require("./routes/api/auth");
const contactsRouter = require('./routes/api/contacts');

const app = express()

app.use(cors())
app.use(express.json())

app.use("/users", authRouter);
app.use('/api/contacts', contactsRouter)

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, _, res, __) => {
  const {status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
