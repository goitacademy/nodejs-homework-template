const _ = require('lodash');
const Schemas = require('../schemas');

const schemaValidator = (req, res, next) => {
  console.log('req: ', req.route.path);
  const method = req.method.toLowerCase();
  const _supportedMethods = ['post', 'put'];
  const _validationOptions = {
    abortEarly: false, // abort after the last validation error
    allowUnknown: true, // allow unknown keys that will be ignored
    stripUnknown: true, // remove unknown keys from the validated data
  };
  const route = req.route.path;

  if (_.includes(_supportedMethods, method) && _.has(Schemas, route)) {
    // get schema for the current route
    const _schema = _.get(Schemas, route);

    const { error } = _schema.validate(req.body, _validationOptions);
    if (error) {
      const JoiError = {
        status: 'failed',
        message: 'At least one of the field is invalid',
        error: {
          original: error,
          // fetch only message and type from each error
          details: _.map(error.details, ({ message, type }) => ({
            message: message.replace(/['"]/g, ''),
            type,
          })),
        },
      };
      // Custom Error
      const CustomError = {
        status: 'failed',
        error: 'Invalid request data. Please review request and try again.',
      };
      // Send back the JSON error response
      res.status(400).json(JoiError ?? CustomError);
    } else {
      next();
    }
  } else {
    next();
  }
};
module.exports = schemaValidator;
