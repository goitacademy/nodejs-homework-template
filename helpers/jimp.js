import Jimp from "jimp";

const jimpAvatar = (pass) => {
  Jimp.read(pass)
    .then((avatar) => {
      avatar.resize(256, 256);
    })
    .catch((error) => error.massage);
};

export default jimpAvatar;
