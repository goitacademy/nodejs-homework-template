const patchSchema = require('./schemas/patchSchema');
const postSchema = require('./schemas/postSchema');
const putSchema = require('./schemas/putSchema');

function postValidation(req, res, next) {
  if (postSchema.validate(req.body).error) {
    res.status(400).json({ message: postSchema.validate(req.body).error.message });
  } else {
    next();
  }
}

function putValidation(req, res, next) {
  if (putSchema.validate(req.body).error) {
    res.status(400).json({ message: putSchema.validate(req.body).error.message });
  } else {
    next();
  }
}

function patchValidation(req, res, next) {
  if (patchSchema.validate(req.body).error) {
    res.status(400).json({ message: patchSchema.validate(req.body).error.message });
  } else {
    next();
  }
}

module.exports = {
  postValidation,
  putValidation,
  patchValidation,
};
