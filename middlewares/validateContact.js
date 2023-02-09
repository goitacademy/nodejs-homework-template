const validateContact = schema => {
  return async function (req, res, next) {
    try {
      const result = await schema.validate(req.body);
      console.log(result);

      if (result.error) {
        res.status(400).json({ message: 'missing required name field' });
        return;
      }
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

const validateFavorite = schema => {
  return async function (req, res, next) {
    try {
      const result = await schema.validate(req.body);
      console.log(result);

      if (result.error) {
        res.status(400).json({ message: 'missing field favorite' });
        return;
      }
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

module.exports = { validateContact, validateFavorite };
