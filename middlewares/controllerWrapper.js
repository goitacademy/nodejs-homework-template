const CreateError = require("http-errors");

const controllerWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      console.log("controllerWrapper", controller);
      await controller(req, res, next);
    } catch (error) {
      console.log("error");
      const newError = requestErrorType(controller, error);
      next(
        CreateError(newError.errorStatus, newError.errorMessage, {
          statusOperation: false,
          code: newError.errorStatus,
        })
      );
    }
  };
};
module.exports = controllerWrapper;

function requestErrorType(controller, error) {
  let errorMessage = null;
  let errorStatus = error.status;
  switch (controller.name) {
    case "getContactById":
      errorMessage = "Contact not found";
      errorStatus = 404;
      break;
    case "removeContact":
      errorMessage = "Can't delete. Contact not found";
      errorStatus = 404;
      break;
    case "updateContact":
      errorMessage = "Can't update. Contact not found";
      errorStatus = 404;
      break;
    case "updateStatusContact":
      errorMessage = "Can't update status. Contact not found";
      errorStatus = 404;
      break;
    default:
      errorMessage = error.message;
  }
  return { errorMessage, errorStatus };
}
