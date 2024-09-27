var _ = require('lodash');
var regexes = require('./regexes');

function redact(message) {
  if (_.isPlainObject(message)) {
    // recursively walk through all values of an object
    return _.mapValues(message, redact);
  }
  if (_.isArray(message)) {
    // walk through array and redact each value
    return _.map(message, redact);
  }
  if (!_.isString(message)) {
    // all non-string types can be safely returned
    return message;
  }
  // apply all available regexes to the string
  _.each(regexes, function(values) {
    var regex = values[0];
    var replacement = values[1];
    message = message.replace(regex, replacement);
  });
  return message;
}

module.exports = redact;
