const requestError = (res, error) => {
    const message = error.details[0].message;
    res.status(400).json({ message });
  };
  
  const addRequestError = (res, error) => {
    const message = error.details[0].message;
    res.res.status(400).json({ message });
  };
  
  module.exports = { requestError, addRequestError };