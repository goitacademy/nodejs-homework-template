const signup = async (req, res,next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).header("Content-Type", "application/json").json({
      status: "conflict",
      code: 409,
      message: "Email in use",
    });
    }
    try {
        const newUser = new User({email})
    } catch (error) {
        next(error);
    }
};
