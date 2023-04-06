const express = require("express");
const routerRegister = express.Router();


const {
    registerContact
} = require("../../models/user");

const {registrationSchema} = 
require("../../models/validation");

routerRegister.post("/", async (req, res) =>{
    const {error} = registrationSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    try {
        const {email, password} = req.body;
        const user = await registerContact(email, password)
        return res.status(201).json(user);
    } catch{
        return res.status(500).send("Something went wrong");
    }
})

module.exports = routerRegister;