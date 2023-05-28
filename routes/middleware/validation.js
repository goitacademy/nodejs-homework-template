const HttpError = require("../../helpers/HttpError");

// const validate = (schema) => {
//   const func = (req, res, next) => {
//     if (Object.keys(req.body).length === 0 || typeof req.body !== "object") {
//       return res.status(400).json({ message: "missing fields" });
//     }
//     const { error } = schema.validate(
//       {
//         query: req.query,
//         params: req.params,
//         body: req.body,
//       },
//       {
//         abortEarly: false,
//         allowUnknown: true,
//         stripUnknown: false,
//       }
//     );
//     if (error) {
//       const errorField = error.details[0].path[0];
//       const errorType = error.details[0].type;
//       if (errorType === "any.required") {
//         return HttpError(400, {
//           message: `missing required ${errorField.path[0]} field`,
//         });
//       }
//     }

//     next();
//   };

//   return func;
// };

function validate(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(
      {
        query: req.query,
        params: req.params,
        body: req.body,
      },
      {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: false,
      }
    );
    
    if (Object.keys(value.body).length === 0 || typeof value.body !== "object") {
      console.log("req.params",req.route.path);
      if (req.route.path === '/:contactId/favorite' ) {
      return res.status(400).json({ "message": "missing field favorite" });
        
      }
      return res.status(400).json({ "message": "missing fields" });
    }
    if (error) {
      const errorField = error.details[0];
      const errorType = error.details[0].type;
console.log(error.details[0]);
      if (errorType === "any.required") {
        return res.status(400).json({
          "message": `missing required ${errorField.context.key} field`,
        });
      }
    }

    req.query = value.query;
    req.params = value.params;
    req.body = value.body;

    return next();
  };
}

module.exports = validate;
