const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/api/contacts')

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())


app.use('/api/contacts', contactsRouter)

app.use((req, res, next  ) => {
  res.status(404).json({ message: 'Not found' });
  next();
})

app.use((err, __, res, ___) => {
  console.log(err);
  return res
  .status(err.status || 500)
  .json({ error: err.message || "Internal server error"});
  // res.status(500).json({ message: err.message })
});

// const PORT = process.env.PORT || 3000;
app.listen(3000, () => { 
  console.log("Server listening on port: 3000")
})

module.exports = app
