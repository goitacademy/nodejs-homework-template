const { param } = require("../../routes/contacts");

module.exports.v2 = {
  config: () => { },
  uploader: {
    upload: (pafh, options, cb) => (
      cb(null,{public_id: 1234, secure_url: 'secure_Url_Cloudinary'} )
    )}
}