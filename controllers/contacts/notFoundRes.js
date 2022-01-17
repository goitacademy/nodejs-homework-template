const notFoundRes = contactId => ({
  status: "error",
  code: 404,
  message: `Contact with id=${contactId} not found`,
});

module.exports = notFoundRes;
