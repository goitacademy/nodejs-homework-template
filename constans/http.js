export const HTTP_STATUS = {
  ok: 200,
  created: 201,
  noContent: 204,
  badRequest: 400,
  unauth: 401,
  notFound: 404,
  conflict: 409,
  unprocContent: 422,
  serverError: 500,
};

export const HTTP_STATUS_TEXT = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
  422: "Unprocessable Content",
  500: "Sever error",
};
