const { status } = require("../consts");

const handleMongooseErr = (err) => {
  if (err.name !== "ValidationError") {
    return err;
  }
  err.status = status.MISSING_DATA.status;
  return err;
};

module.exports = handleMongooseErr;
