const is404 = (data, res, dataIfTrue) => {
  if (!data) {
    res.status(404);
    res.json({ message: "Not found" });
    return 0;
  }

  if (dataIfTrue) {
    res.json(dataIfTrue);
  }
};

module.exports = { is404 };
