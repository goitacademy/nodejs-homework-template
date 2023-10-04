const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());

app.use("/api/contacts", contactsRouter);
app.use((req, res) => {
  res.status(404).json({
    message: "Not found"
  })
});

app.use((err, req, res, next) => {
  const {status = 500, message = "Server error"} = err;
  res.status(status).json({
    message,  })
});

app.listen(3000);


// const moment = require('moment');
// const fs = require("fs/promises");
// // ------api
// const contacts = require("./models/contacts.json");
// const app = express(); //app web-server
// app.use(cors());

// app.get("/api/contacts", (req, res) => {
//   res.json(contacts);
// })

// app.get("/api/contacts/:id", (req, res) => {
//   res.json(contacts[0]);
// })

// app.post("/api/contacts", (req, res) => {
//   res.json(contacts[0]);
// })

// app.put("/api/contacts/:id", (req, res) => {
//   res.json(contacts[0]);
// })

// app.delete("/api/contacts/:id", (req, res) => {
//   res.json(contacts[0]);
// })
// ----- end api

// const corsMiddleware = cors();

// app.use( async (req, res, next) => {
  //   const {method, url} = req;
  //   const date = moment().format("DD-MM-YYYY_hh:mm:ss");
  //   await fs.appendFile("./public/server.log", `\n ${method} ${url} ${date}`);
  //   next();
  // });
  
  
  
  // app.use(corsMiddleware);
// app.use((req, res) => {
//   res.status(404).json({
//     message: "Not faund"
//   })
// }) 

// 

// const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

// app.use(logger(formatsLogger))
// app.use(cors())
// app.use(express.json())

// app.use('/api/contacts', contactsRouter)

// app.use((req, res) => {
//   res.status(404).json({ message: 'Not found' })
// })

// app.use((err, req, res, next) => {
//   res.status(500).json({ message: err.message })
// })

// module.exports = app
