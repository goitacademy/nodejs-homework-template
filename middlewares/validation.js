const validateBody = (scheme) => async (req, res, next) => {
  try {
    await scheme.validateAsync(req.body);
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ status: "error", code: 400, message: error.message });
  }
};

module.exports = { validateBody };
