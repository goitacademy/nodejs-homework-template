const NotFound = (res, id, status = 404) => {
  res.status(status).json({
    status: "error",
    code: status,
    message: `Contact with id=${id} not found`,
  });
};

module.exports = { NotFound };
