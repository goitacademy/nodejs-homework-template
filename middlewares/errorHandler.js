// Se le da respuesta al cliente
const errorHandlerMiddleware = (err, _, res, __) => {
  //res.status(500).json({ message: err.message });
  res.status(err.status || 500).json({
    error: {
      message: err.message,
    },
  });
};

module.exports = errorHandlerMiddleware;
