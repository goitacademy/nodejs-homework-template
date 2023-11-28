const status = {
  GET_SUCCESS: { status: 200, message: "OK" },
  DELETE_SUCCESS: { status: 200, message: "Deleted success" },
  PUT_SUCCESS: { status: 200, message: "Updated success" },
  CREATED: { status: 201, message: "Created" },
  NOT_FOUND: { status: 404, message: "Not Found" },
  MISSING_DATA: { status: 400, message: "Bad Request" },
  BAD_ID: { status: 400, message: "Id is not valid" },
};

Object.freeze(status);

module.exports = status;
