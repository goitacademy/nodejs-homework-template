const { BadRequest } = require("http-errors");

const validation = (schema) => {
  const validationMiddleware = async (req, _res, next) => {
    try {
      await schema.validateAsync(req.body);
    } catch (error) {
      const newError = new BadRequest(
        `Missing required field: ${error.message.replace(/"/g, " ")}`
      );
      next(newError);
    }
    next();
  };
  return validationMiddleware;
};

module.exports = validation;

//Sync

// const validation = (schema) => {
//   const validationMiddleware = (req, _, next) => {
//     const { error } = schema.validateAsync(req.body);
//     if (error) {
//       new BadRequest(
//         `Missing required field: ${error.message.replace(/"/g, " ")}`
//       );
//       next(error);
//     }
//     next();
//   };
//   return validationMiddleware;
// };

// module.exports = validation;
