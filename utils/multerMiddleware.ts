// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/uploads");
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     cb(null, Date.now() + ext);
//   },
// });

// const upload = multer({
//   storage: storage,
//   fileFilter: function (req, file, callback) {
//     if (file.mimetype == "image/png" || file.mimetype == "image/jpg") {
//       callback(null, true);
//     } else {
//       console.log("only png and jpg allowed");
//       callback(null, false);
//     }
//   },
//   limits: {
//     fileSize: 2048 * 2048 * 2,
//   },
// });

// export default upload;
