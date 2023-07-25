module.exports.catchErrors = (middleware) => {
    return async (req, res) => {
      try {
        await middleware(req, res);
      } catch (error) {
        return res.status(404).json({ status: "Not found , catch" });
      }
    };
  };