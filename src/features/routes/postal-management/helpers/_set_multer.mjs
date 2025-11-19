import multer from 'multer';

// configure storage for multer
const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'uploads/contents/'); // specify the upload directory
      },
      filename: (req, file, cb) => {
        cb(null, new Date().toISOString()+'-'+Math.round(Math.random() * 1E9)+'.'+file.mimetype.split('/')[1]); // rename the file
      }
  });

// configure filter
const fileFilter = (req, file, cb) => {
    const mimetype = file.mimetype
    if (mimetype === "image/jpeg" || mimetype === "image/png" || mimetype === "image/jpg") {
        cb(null, true)
    } else {
        cb(null, false)
    }
      
  }

export const upload = multer({ storage, fileFilter, limits: {
    fileSize: 1024 * 1024, // 1MB limit
  }})