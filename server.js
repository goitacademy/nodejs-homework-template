const express = require('express');
const cors = require('cors');
const logger = require('morgan')
const conection = require("./db/connection");
const routerApi = require('./api/index');

require("dotenv").config();


const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

require("./config/config-passport");
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));

app.use("/api", routerApi);

app.use((_, res) => {
    res.status(404).json({
        status: 'error',
        code: 404,
        message: 'use api on routes /api/contacts',
        data: 'Not found'
    });
});


app.use((err,_, res)=> {
    console.log(err.stack);
    res.status(500).json({
        status: 'fail',
         code: 500,
        message: err.message,
        data: 'internal server error'
    });
});

const PORT = process.env.PORT || 3000;

conection
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server running, use our API on port ${PORT}`)
    })
})
.catch((err) => {
    console.log(`Server is not running.
    Error message: ${err.message}`);
    process.exit(1);
})

module.exports = app;