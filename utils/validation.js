const httpError = require("../helpers/httpError");

const { schemas } = require("../models/contacts");

function validateAddContact(req, res, next) {
    const {error} = schemas.addSchema.validate(req.body);
    if(error) {
    throw httpError.HttpError(400, error.message);
}
    next();
}

function validatePutContact(req, res, next) {
    const {error} = schemas.putSchema.validate(req.body);
    if(error) {
    throw httpError.HttpError(400, error.message);
}
    next(); 
}

function validatePatchContact(req, res, next) {
    const {error} = schemas.updateFavoriteSchema.validate(req.body);
    if(error) {
    throw httpError.HttpError(400, error.message);
}
    next(); 
}


module.exports = {
    validateAddContact,
    validatePutContact,
    validatePatchContact
}
