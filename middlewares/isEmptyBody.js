const isEmptyBody = async (req, res, next) => {
    const keys = Object.keys(req.body);
    if (!keys.length) {
      const error = new Error(`Body must have fields!`);
      error.status = 400;
      return next(error);
    }
    next();
  };
  
  export default isEmptyBody;