const validBody = (schema) => {
  const func = (req, res, next) => {
    if (!req.body.name) {
      next( 
        res.status(400).json({
          message: "missing required name field",
        })
      );
    }
    if (!req.body.email) {
      next( 
        res.status(400).json({
          message: "missing required email field",
        })
      );
    }
    if (!req.body.phone) {
      next( 
        res.status(400).json({
          message: "missing required phone field",
        })
      );
    }
    next();
  };
  return func;
};
const validateBody = (schema) =>{
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        next(error.message);
    }
    next()
  };
  return func;
}
const validEmptyBody = () => {
  const func = (req, res, next) => {
    const bodyEmpty = Object.keys(req.body).length === 0;
    if (bodyEmpty) {
      next(res.status(400).json({ message: "missing fields" }));
    }
    if (!req.body.name) {
      next( 
        res.status(400).json({
          message: "missing required name field",
        })
      );
    }
    if (!req.body.email) {
      next( 
        res.status(400).json({
          message: "missing required email field",
        })
      );
    }
    if (!req.body.phone) {
      next( 
        res.status(400).json({
          message: "missing required phone field",
        })
      );
    }
    next();
  };
  return func;
};

module.exports = { validBody, validateBody, validEmptyBody };