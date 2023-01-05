const validateData = (validationSchema) => async (req, res, next) => {
  try {
    await validationSchema.validateAsync(req.body);
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ status: "rejected", code: 400, message: error.message });
  }
};

module.exports = { validateData };
