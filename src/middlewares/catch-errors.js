module.exports.catchErrors = (middleware) => {
  return async (req, res) => {
    try {
      await middleware(req, res);
    } catch (err) {
      return res.status(404).json({ status: "Not found , catch" });
    }
  };
};
