const { nanoid } = require('nanoid');

const assignRequestId = (req, res, next) => {
  const id = nanoid();
  req.id = id;
  next();
}

module.exports = assignRequestId;