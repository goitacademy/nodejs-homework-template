import Jimp from 'jimp';

export const optimizeImageAndSaveItToPath = async (image, optimizedImagePath) => {
  await Jimp.read(image)
    .then((imageToOptimize) => {
      imageToOptimize.resize(250, 250).quality(60).write(optimizedImagePath);
    })
    .catch((err) => {
      throw err;
    });
};
