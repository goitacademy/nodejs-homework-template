const HttpError = require("../common/models/HttpError");

const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(
    {
      query: req.query,
      body: req.body,
      params: req.params,
    },
      { abortEarly: false },
    );
    next();
  } catch (err) {
    const httpError = new HttpError(400, "Missing fields!", err.details);
    next(httpError);
  }  
}

module.exports = validate;