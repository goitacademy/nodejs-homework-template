export const setSuccessResponse = (code, data) => {
  switch (code) {
    case 200:
      return {
        status: 'success',
        code: 200,
        data: data,
      };

    case 201:
      return {
        status: 'created',
        code: 201,
        data: data,
      };

    case 204:
      return {
        status: 'success',
        code: 204,
        message: 'No Content',
        data: data,
      };

    default:
      break;
  }
};

export const setErrorResponse = (code, message) => {
  switch (code) {
    case 400:
      return {
        status: 'error',
        code: 400,
        message: message,
        data: 'Bad request',
      };

    case 401:
      return {
        status: 'error',
        code: 401,
        message: message,
        data: 'Unauthorized',
      };

    case 404:
      return {
        status: 'error',
        code: 404,
        message: message,
        data: 'Not found',
      };

    case 409:
      return {
        status: 'error',
        code: 409,
        message: message,
        data: 'Conflict',
      };

    case 500:
      return {
        status: 'fail',
        code: 500,
        message: message,
        data: 'Internal Server Error',
      };

    default:
      break;
  }
};
