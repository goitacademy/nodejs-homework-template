const errorCatcherController = (controller) =>
    (req, res) =>
        controller(req, res)
            .then(data => data)
            .catch(err => res.status(500).json({ message: 'Internal server error', details: err }));

const errorCatcherCommon = (func) =>
    (...params) =>
        func(...params)
            .then(data => data)
            .catch(err => err);

module.exports = {
    errorCatcherController,
    errorCatcherCommon
}