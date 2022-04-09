const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    res.status(400).json({ status: "error", code: 400, message: err.message });
  }
};

module.exports = { validateBody };
