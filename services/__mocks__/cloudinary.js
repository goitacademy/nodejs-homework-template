module.exports = {
  v2: {
    config: () => {},
      uploader: {
        upload: (a, b, cb) =>
          cb(null, { public_id: "1234545", secure_url: "http://ggg.com" }),
    },
  },
};