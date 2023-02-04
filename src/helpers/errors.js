const notFoundError = new Error('Not found');
notFoundError.status = 404;

module.exports = { notFoundError };
