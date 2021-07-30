const HTTP_CODES = require("../../../../helpers/httpStatusCodes");

const current = async (req, res) => {
  try {
    const { email, id } = req.user;
    return res.status(HTTP_CODES.OK).json({
      status: "error",
      code: HTTP_CODES.OK,
      data: {
        email,
        id,
      },
    });
  } catch (error) {
    res.status(HTTP_CODES.BAD_REQUEST).json({ error: error.message });
  }
};

module.exports = current;
