module.exports = {
  v2: {
    config: () => {},
    uploader: {
      upload: (a, b, cb) =>
        cb(null, { public_id: '123456', secure_url: 'http://vitaliy.com' }),
    },
  },
};
