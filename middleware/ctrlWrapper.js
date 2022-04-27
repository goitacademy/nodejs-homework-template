const ctrlWrapper = (ctrl) => {
  return async (req, res, next) => {
    try {
      // if (!req.params.contactId) {
      //   res.status(404).json({ message: "Please enter a contact" });
      // }
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = ctrlWrapper;
