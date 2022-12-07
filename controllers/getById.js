const contacts = require("../models/contacts");

const HttpError = require("../helpers/HttpError")

const getById = async(req, res, next)=> {
    const {id} = req.params;
    const result = await books.getContactById(id);

    if(!result) {
        throw HttpError(404, "Not found");
    }

    res.json(result)
}

module.exports = getById