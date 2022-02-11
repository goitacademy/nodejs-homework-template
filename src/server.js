const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const morgan = require('morgan')
const cors = require("cors");

const {getConfig} = require("./config");
const {contactsRouter} = require("./resources/contacts/contacts.router.controller");

class ContactsServer {
    constructor() {
        this.app = null
    }

    start() {
        this.initServer()
        this.initConfig()
        // this.initDatabase();
        this.initMiddlewares()
        this.initRoutes()
        this.initErrorHandling()
        this.startListening()
    }

    initServer() {
        this.app = express();
    };

    initConfig() {
        dotenv.config({path: path.resolve(__dirname, '../.env')})
    };

    initMiddlewares() {
        this.app.use(express.json({limit: "500kb"}));
        this.app.use(morgan("short"))
        this.configureCors();
    };

    initRoutes() {
        this.app.use('/contacts', contactsRouter)
    };

    initErrorHandling() {
        this.app.use((err, req, res, next) => {
            const statusCode = err.status || 500;
            res.status(statusCode).send(err.message);
        });
    };

    startListening() {
        const {port} = getConfig()
        this.app.listen(port)
    };


    configureCors() {
        const {allowedCorsOrigin} = getConfig();
        this.app.use(cors({origin: allowedCorsOrigin}));
    }
}

exports.ContactsServer = ContactsServer