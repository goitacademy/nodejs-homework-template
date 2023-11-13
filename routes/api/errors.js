module.exports = {
  badRequest: (message = 'Bad request') => {
    const error = new Error(message);
    error.status = 400;
    return error;
  },

  unauthorized: (message = 'Unauthorized') => {
    const error = new Error(message);
    error.status = 401;
    return error;
  },

  forbidden: (message = 'Forbidden') => {
    const error = new Error(message);
    error.status = 403;
    return error;
  },
  
  notFound: (message = 'Not found') => {
    const error = new Error(message);
    error.status = 404;
    return error;
  },
};