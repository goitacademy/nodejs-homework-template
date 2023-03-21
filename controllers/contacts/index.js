const { controllersWrapper} = require('../../helpers')

const get = require('./get');
const getById = require('./getById');
const change = require('./change');
const create = require('./create');
const favorite = require('./favorite');
const remove = require("./remove");

module.exports = {
    get: controllersWrapper(get),
    getById: controllersWrapper(getById),
    change: controllersWrapper(change),
    create: controllersWrapper(create),
    favorite: controllersWrapper(favorite),
    remove: controllersWrapper(remove)
}