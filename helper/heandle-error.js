const wrap = fn => async (req, res, next) => {
  try {
    const results = await fn(req, res, next);
    return results;
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: 'Invalid info' });
      next(res);
    }
    next(error);
  }
};

module.exports = wrap;
