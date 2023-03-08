// const tryCatchWrapper = (controller) => async (req, res, next) => {
//   try {
//     const result = await controller(req, res);
//     return result;
//   } catch (e) {
//     const statusCode = e.code || 500;
//     const status = e.status || "Internal Server Error";
//     res
//       .status(statusCode)
//       .json({ status: `${statusCode} ${status}`, message: e.message });
//   }
// };
// module.exports = tryCatchWrapper;
const controllerWrapper = (controller) => {
  const fn = async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return fn;
};

module.exports = controllerWrapper;
