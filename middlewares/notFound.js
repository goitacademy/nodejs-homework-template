const notFound = (req, res) => {
  res.status(404).send(`This path ${req.baseUrl} can't found`)
}

module.exports = notFound
