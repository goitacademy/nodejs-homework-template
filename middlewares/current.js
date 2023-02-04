const { NotFound } = require("http-errors");

const isCurrent = async (req, res, next) => {
  const { _id } = req.user;
  console.log(_id);

  if (!_id) {
    throw new NotFound();
  } else next();
};

module.exports = { isCurrent };
