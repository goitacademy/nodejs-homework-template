module.exports.v2 = {
  config: () => {},
  uploader: {
    upload: (first, second, cb) => {
      cb(null, {
        public_id: 1234,
        secure_url: 'avatarUrl',
      });
    },
  },
};
