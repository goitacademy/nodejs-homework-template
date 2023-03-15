const { getCollections } = require('../db/connection')


module.exports = (req, res, next) => {
    const collections = getCollections();
    req.db = {...collections};
    next();
}