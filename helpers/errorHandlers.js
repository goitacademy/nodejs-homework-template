const serverError = (err, res) => {
  console.log(err.stack);
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
};

const noDataError = (res) => {
  return res.status(404).json({
    message: `no data found`,
    code: 404,
  });
};

const noDataByIdError = (res) => {
  return res.status(404).json({
    message: `no contacts by this id found`,
    code: 404,
  });
};

const duplicateError = (res) => {
  return res.status(400).json({
    message: `contact with such a name already exist`,
    code: 400,
  });
};

const missingFieldFavorite = (res) => {
  return res.json({
    message: `missing field favorite`,
    code: 400,
  });
};

module.exports = {
  serverError,
  noDataError,
  noDataByIdError,
  duplicateError,
  missingFieldFavorite,
};
