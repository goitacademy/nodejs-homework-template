const validationStatusBody = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body)

    if (value.favorite === null || error) {
      error.status = 400;
      error.message = `${error.message.replace(
        /"/g,
        ""
      )}, please, set true or false`;
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
