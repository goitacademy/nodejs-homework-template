const errorCatcher = (fn) => {
  try {
    return fn;
  } catch (error) {
    console.log("======error=====");
    console.log(error);
  }
};

module.exports = {
  errorCatcher,
};
