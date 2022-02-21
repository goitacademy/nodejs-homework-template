const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    console.log(err.details);
    return res
      .status(400)
      .json({ code: 400, status: "error", message: err.message });
  }
};

module.exports = { validateBody };
