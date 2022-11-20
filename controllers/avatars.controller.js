async function uploadController(req, res, next) {
  // console.log(req);
  // TODO upload avatars
  return res.json({
    status: "success",
    message: {
      status: "success",
      message: "upload ok",
    },
  });
}

async function downloadController(req, res, next) {
  // console.log(req);
  // TODO downoad avatars
  return res.json({
    status: "success",
    message: "download ok",
  });
}

module.exports = {
  downloadController,
  uploadController,
};
