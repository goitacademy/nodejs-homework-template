const jsonResponse = (res, code, data) => res.json({ code, data });

module.exports = {
  jsonResponse,
};
