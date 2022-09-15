const errorHandlerController = (controller) =>
    (req, res, next) =>
        controller(req, res, next)
            .then(data => data)
            .catch(next);

const errorHandlerAsync = (func) =>
    (...params) =>
        func(...params)
            .then(data => data)
            .catch(err => err);

module.exports = {
    errorHandlerController,
    errorHandlerAsync
}