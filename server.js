const express = require('express');
const cors = require('cors');
const logger = require('morgan')
const conection = require("./db/connection");
const routerApi = require('./api/index');
const { getUserByVerificationToken, verifyUser } = require('./service/user');

require("dotenv").config();


const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

require("./config/config-passport");
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));

app.use("/api", routerApi);

app.get("/verify/:verificationToken", async (req, res, next) => {
    try {
        const existingUser = await getUserByVerificationToken(req.params.verificationToken);
        
        if (existingUser && existingUser.verificationToken && existingUser.verificationToken === req.params.verificationToken) {
            await verifyUser(existingUser._id);
            res.status(200).json({ message: "Verification successful" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        next(error);
    }
});

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