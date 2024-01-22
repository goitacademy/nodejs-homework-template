const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const contactsRouter = require("./routes/contactsRouter");

const app = express()

app.set("json spaces", 2)

app.use(morgan("tiny"));
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})

