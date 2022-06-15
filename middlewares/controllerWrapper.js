const CreateError = require("http-errors");

const controllerWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      const errorMessage = requestErrorType(controller, error);
      next(
        CreateError(404, errorMessage, {
          statusOperation: false,
          code: 404,
        })
      );
    }
  };
};
module.exports = controllerWrapper;

function requestErrorType(controller, error) {
  let errorMessage = null;
  switch (controller.name) {
    case "getContactById":
      errorMessage = "Contact not found";
      break;
    case "removeContact":
      errorMessage = "Can't delete. Contact not found";
      break;
    case "updateContact":
      errorMessage = "Can't update. Contact not found";
      break;
    case "updateStatusContact":
      errorMessage = "Can't update status. Contact not found";
      break;
    default:
      errorMessage = error.message;
  }
  return errorMessage;
}
