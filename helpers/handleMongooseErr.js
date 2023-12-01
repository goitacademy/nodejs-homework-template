const { status } = require("../consts");

const handleMongooseErr = (err) => {
  const { name } = err;

  if (name === "ValidationError") {
    err.status = status.MISSING_DATA.status;
    return err;
  }

  if (name === "MongoServerError") {
    err.status = status.USER_CONFLICT.status;
    return err;
  }

  return err;
};

module.exports = handleMongooseErr;
