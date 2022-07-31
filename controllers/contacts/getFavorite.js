const getAll = require('./getAll');

const getFavorite = async (req, res, next) => {
    const allContacts = getAll();
    

    res.json(result);
}

module.exports = getFavorite;