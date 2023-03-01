const tryCatchWrapper = (fn) => async (req, res) => {
  try {
    const result = await fn(req, res);
    return result;
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
module.exports = tryCatchWrapper;
