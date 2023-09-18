const express = require('express')
const logger = require('morgan')
const cors = require('cors')

// const contactsRouter = require('./routes/api/contacts')

const app = express()
const port = 3000; 

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Привет, мир!");
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("posted on /");
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});





// app.use('/api/contacts', contactsRouter)

// app.use((req, res) => {
//   res.status(404).json({ message: 'Not found 2' })
// })

// app.use((err, req, res, next) => {
//   res.status(500).json({ message: err.message })
// })


// module.exports = app

