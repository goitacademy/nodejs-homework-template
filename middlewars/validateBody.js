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

      const bodyEmpty = Object.keys(req.body).length === 0;
      if (bodyEmpty ) {
        next(res.status(400).json({ message: "missing fields favorite" }));
      }
           if (!req.body.favorite) {
        next( 
          res.status(400).json({
            message: "missing required favorite field",
          })
        );
      }
      next()
    }
 
  return func;
};

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