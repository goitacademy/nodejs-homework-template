/**
 * Middleware function to wrap asynchronous controller functions for error handling.
 *
 * @param {function} controller - Asynchronous controller function to be wrapped
 * @returns {function} Middleware function that wraps the controller
 */
const controllerWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      // Call the provided controller function and handle any errors
      await controller(req, res, next);
    } catch (error) {
      // Pass any caught errors to the next middleware for error handling
      next(error);
    }
  };
};

module.exports = controllerWrapper;

// This middleware function, controllerWrapper, is used to wrap asynchronous controller functions to handle errors. It takes a controller function as input, executes it, and captures any errors that may occur during its execution. If an error occurs, it passes the error to the next middleware for error handling.

// This wrapper simplifies the error-handling process for your controller functions by encapsulating the error handling logic within the middleware. It allows you to focus on writing your controller functions without worrying about handling errors explicitly in each one.