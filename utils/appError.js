class AppError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

// const AppError = (status, message) => {
//   const error = new Error(message);
//   error.status = status;
//   throw error;
// };

module.exports = AppError;
