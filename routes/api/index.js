const express = require("express");
const routerContact = require("./contacts");

const routerIndex = express.Router();


module.exports = () => {
    routerIndex.use("/contact", routerContact);

    return routerIndex;
}