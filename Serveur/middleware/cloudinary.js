import cloudinary from '../config/cloudinary';
import '@babel/polyfill';

const cloudUpload = async (req, res, next) => {
  try {
    // req.file[0].path  __dirname + "/uploads/" ./Serveur/uploads/${req.file[0]}
    const image = await cloudinary.v2.uploader.upload(`./Serveur/uploads/${req.body.pictures}`, { folder: 'uploads' },
      (error, result) => {
        console.log(error, result);
      });
    req.body.pictures = image.url;
  } catch (error) {
    console.log(error);
  }
  return next();
};
export default cloudUpload;
