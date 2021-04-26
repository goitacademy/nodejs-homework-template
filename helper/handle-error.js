const wrap = fn => async (req, res, next) => {
  try {
    const result = await fn(req, res, next);
    return result;
  } catch (error) {
    if (error.name === 'ValidationError') {
      error.status = 400;
    }
    next(error);
  }
};

module.exports = wrap;
