const validation = (arg, schema) => async (req, res, next) => {
  let request;
  if (arg === "body") request = req.body;
  if (arg === "params") request = req.params;
  try {
    await schema.validateAsync(request);
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ status: "error", code: 400, message: error.message });
  }
};

module.exports = validation;
