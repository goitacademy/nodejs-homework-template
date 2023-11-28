const morgan = require('morgan');
const fs = require('node:fs');
const path = require('node:path');

morgan.token('reqId', function (req, res) {
  return req.id;
});

const accessLogStream = fs.createWriteStream(
  path.resolve(__dirname, "..", "db", 'access.log'),
  { flags: 'a' }
);

const getLogger = () => morgan(
  ':reqId :method :url :status :res[content-length] - :response-time ms',
  {
    stream: accessLogStream,
  },
);

module.exports = getLogger;