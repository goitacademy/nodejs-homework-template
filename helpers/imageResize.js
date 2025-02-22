import Jimp from "jimp";
import HttpError from "./HttpError.js"; // видає помилку

const imageResize = (imagePath) => {
  Jimp.read(imagePath)
    .then((image) => {
      return image.resize(250, 250).quality(80).write(imagePath);
    })
    .catch((error) => {
      throw HttpError(500);
    });
};

export default imageResize;
