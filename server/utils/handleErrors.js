export const handleValidationError = (err, res, next) => {
  if (err.name !== "ValidationError") {
    console.error(err.message);
    return next(err);
  }

  res.status(400).json({
    status: 400,
    statusText: "Bad Request",
    data: { message: err.message },
  });
};

export const handleNotFoundByIdError = (contact, res, id) => {
  if (!contact) {
    res.status(404).json({
      status: 404,
      statusText: "Not Found",
      data: { message: `Not found contact by id: ${id}` },
    });
  }
};
