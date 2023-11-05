const HTTPError = require('../helpers/HTTPError');

const handle404error = () => {throw HTTPError("Not found", 404)};

module.exports = handle404error;