const successTemplate = (res, message, data = null) => {
  return res.status(200).json({ status: "200 OK", message, data });
};

module.exports = { successTemplate };
