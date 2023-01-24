const asyncHandler = async (func, ...parameters) => {
  try {
    return parameters ? await func(...parameters) : await func();
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = asyncHandler;
