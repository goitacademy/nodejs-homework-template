

const contacts = require("../models/contacts");

const HttpError = require("../helpers/HttpError")

const updateById = async(req, res, next)=> {
    const {id} = req.params;
    const result = await contacts.updateContact(id, req.body);
    if(!result) {
        throw HttpError(404, "Not found")
    }

    res.json(result)
}

module.exports = updateById