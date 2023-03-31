const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/api/contacts')
const usersRouter = require('./routes/api/users');
const currentRouter = require("./routes/api/curentuser");


const  dotenv = require('dotenv');
dotenv.config();



const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'


app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static("public"))

app.use('/api/contacts', contactsRouter);
app.use('/api/users', usersRouter);
app.use("/api/users",currentRouter);




app.use((err, req, res, next) => {
    const isNotFound = err.message.indexOf('not found')
    const isCastError = err.message.indexOf('Cast to ObjectId failed')
    if (err.message && (isNotFound || isCastError)) {
        return next()
    }

    console.log(err.stack)

    res.status(500).json({error: err.stack})
})

app.use((req, res) => {
    res.status(404).json({ message: 'Not found' })
})


module.exports = app
