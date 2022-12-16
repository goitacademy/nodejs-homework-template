const notFoundErrorTemplate = (res) => {
  return res.status(404).json({
    message: "User was not found",
    status: "404 Not Found",
  });
};

const badRequestTemplate = (res, message) => {
  return res.status(400).json({
    message,
    status: "400 Bad Request",
  });
};

module.exports = {
  notFoundErrorTemplate,
  badRequestTemplate,
};
