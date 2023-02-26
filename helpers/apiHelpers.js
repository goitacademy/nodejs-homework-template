const path = require("path");

const contactsPath = path.join(__dirname, '..', 'db', "contacts.json");

const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

const controllerWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch(next);
  };

};

const errorHandler = (err, _, res, next) => {
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong';

    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    })
}

module.exports = { contactsPath, isEmpty, controllerWrapper, errorHandler };
