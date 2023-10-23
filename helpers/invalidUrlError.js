module.exports = (_, res) => {
  res.status(404).json({ code: 404, message: 'Path not found' });
};
