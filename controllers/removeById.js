const contacts = require("../models/contacts");

const HttpError = require("../helpers/HttpError")

const removeById = async(req, res, next)=> {
    const {id} = req.params;
    const result = await contacts.removeContact(id);
    if(!result) {
        throw HttpError(404, "Not found")
    }

    res.json({
        message: "Delete success"
    })
}

module.exports = removeById;