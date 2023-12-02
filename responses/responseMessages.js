const delet = {
  successed: {
    message: "contact deleted",
    status: 200,
  },
  error: {
    message: "Not found",
    status: 404,
  },
};

const get = {
  successed: {
    status: 200,
  },
  error: {
    message: "Not found",
    status: 404,
  },
};

const put = {
  successed: {
    status: 200,
  },
  error: {
    message: "Not found",
    status: 404,
  },
};

module.exports = { delet, get, put };
