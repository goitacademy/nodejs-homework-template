import Jimp from "jimp";

Jimp.read(pass)
  .then((avatar) => {
    avatar.resize(256, 256);
  })
  .catch((error) => error.massage);

export default Jimp;
