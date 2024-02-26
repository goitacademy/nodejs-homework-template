async function current(req, res, next) {
  const { email, subscription } = req.user;
  try {
    res.status(200).json({
      status: "OK",
      body: { email, subscription },
    });
  } catch (error) {
    next(error);
  }
}

export { current };
