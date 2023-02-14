const validateUser = schema => {
  return async function (req, res, next) {
    try {
      const result = await schema.validate(req.body);

      if (result.error) {
        const message = { ...result.error.details };
        res.status(400).json({ message: message[0].message });
        return;
      }
      next();
    } catch (error) {
      console.log('error validation user');
      res.status(500).json({ message: error.message });
    }
  };
};

module.exports = { validateUser };
