const validateParams = schema => async (req, res, next) => {
  try {
    await schema.validateAsync(req.params);
    next();
  } catch (error) {
    console.log(error.details);
    return res
      .status(400)
      .json({ status: 'error', code: 400, message: error.message });
  }
};

module.exports = validateParams;
