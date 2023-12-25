const responseCodes = require("../responses");

module.exports = (res, code, data = {}, message = null) => {
  return res
    .status(code)
    .json({ code, message: message ?? responseCodes[code], data });
};
