const validationStatusBody = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body)

    if (error) {
      error.status = 400;
      error.message = `${error.message.replace(
        /"/g,
        ""
      )}`;
      next(error)
    }

    if (value.favorite === undefined) {
      error.status = 400;
      error.message = "missing field favorite";
      next(error)
    }

    next()
  }
}


module.exports = validationStatusBody
