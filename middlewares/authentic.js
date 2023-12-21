const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { SECRET_KEY } = process.env;

const authentic = async (req, _, next) => {
    try {
        const { authorization = "" } = req.headers;
        const [bearer, token] = authorization.split(" ");

        if()
    } catch (error) {
        
    }
}