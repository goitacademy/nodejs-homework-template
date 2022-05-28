module.exports.catchErrors = (middleware) => {
  return async (req, res) => {
    try {
      await middleware(req, res);
    } catch (err) {
      return res.status(404).json({ status: "Not found , catch" });
    }
  };
};
module.exports.catchRegErrors = (middleware) => {
  return async (req, res) => {
    try {
      await middleware(req, res);
    } catch (err) {
      return res.status(409).json({
        contentType: "application/json",
        ResponseBody: { message: "Email in use" },
      });
    }
  };
};
module.exports.catchLogErrors = (middleware) => {
  return async (req, res) => {
    try {
      await middleware(req, res);
    } catch (err) {
      return res.status(401).json({
        ResponseBody: { message: "Email or password is wrong or none verify" },
      });
    }
  };
};
module.exports.catchVerifyErrors = (middleware) => {
  return async (req, res) => {
    try {
      await middleware(req, res);
    } catch (err) {
      return res.status(400).json({  message: "Verification has already been passed" });
    }
  };
};
