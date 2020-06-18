import multer from 'multer';

const storage = multer.diskStorage({ // memoryStorage
  destination(req, file, cb) {
    cb(null, './Serveur/uploads');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
    req.body.pictures = file.originalname;
  },
});
const fileFilter = (req, file, cb) => {
  if (!file.mimetype.match(/jpe|jpeg|png|gif$i/)) {
    cb(new Error('File is not supported'), false);
  }
  cb(null, true);
};
const upload = multer({ storage, fileFilter });

export default upload;
