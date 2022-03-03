const validateBody = (schema, answer, status) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    return res.status(400).json(answer(status.error, 400, err.message));
  }
};

module.exports = { validateBody };
