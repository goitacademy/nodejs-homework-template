const decorator = controler => {
  const func = async (req, res, next) => {
    try {
      await controler(req, res, next)
    }
    catch (error) {
      const { status = 500, message = "Server error" } = error;
      res.status(status).json({
        message,
    }); 
    }
  }
  return func;
}

module.exports = decorator;