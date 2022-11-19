function NotFoundHttpError() {
  const err = new Error("Not Found");
  err.status = 404;
  return err;
}
const customError = ({status, message}) => {
  const error = new Error(message);
  error.status = status;

  return error;
};

module.exports = {
  customError,
  NotFoundHttpError,
};
