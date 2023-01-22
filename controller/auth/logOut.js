const logOut = async (req, res, next) => {
  try {
    res.status(201).json();
  } catch (error) {
    next(error);
  }
};

module.exports = logOut;
