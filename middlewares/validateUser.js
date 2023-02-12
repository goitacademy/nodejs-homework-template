const validateUser = schema => {
  return async function (req, res, next) {
    try {
      const result = await schema.validate(req.body);
      const message = { ...result.error.details };
      console.log(message);

      if (result.error) {
        res.status(400).json({ message: message[0].message });
        return;
      }
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

module.exports = { validateUser };
