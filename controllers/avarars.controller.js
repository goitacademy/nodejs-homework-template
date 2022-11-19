// const Joi = require("joi");

async function uploadController(req, res, next) {
  console.log(req);
  return res.json("upload ok");
}

async function downloadController(req, res, next) {
  console.log(req);
  return res.json("download ok");
}

module.exports = {
  downloadController,
  uploadController,
};
