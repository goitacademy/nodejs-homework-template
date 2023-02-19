const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

const controllerWrapper = (controller) => {
  return (req, res, next) => {
    try {
      controller(req, res);
    } catch (err) {
      next(err);
    }
  };
};

const errorHandler = (err, _, res) => {
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong';

    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    })
}

module.exports = { isEmpty, controllerWrapper, errorHandler };
