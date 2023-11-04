

// const ctrlWrapper = getAll =>{
//   const funk = async (req, res, next) => {
//     try {
//       await getAll(res, req,next);
//     } catch (error) {
//       next(error)
//     }
//   }
//   return funk
// }

const ctrlWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = ctrlWrapper;

