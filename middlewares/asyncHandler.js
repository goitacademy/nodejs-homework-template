async function asyncHandler(promise) {
  try {
    const data = await promise;
    return data;
  } catch (error) {
    return console.log(error);
  }
}

module.exports = asyncHandler;
