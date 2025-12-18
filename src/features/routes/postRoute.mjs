import  { Router }  from 'express'
const router = Router()
import multer from 'multer'
import fs from 'fs'
import path from 'path'

// controllers
import { 
  fetchAllContent, 
  saveContent, 
  deleteContent, 
  updateContent, 
  fetchContentByID,
  fetchContentByKeywords,
  fetchAllContentByUserId
} from '../controllers/postController.mjs'

async function ensureUploadDir() {
    const dir = path.join(process.cwd(), 'uploads/posts/')
    try {
      await fs.promises.access(dir)
    } catch (error) {
      await fs.promises.mkdir(dir, { recursive: true })
    }
}
ensureUploadDir()


// configure storage for multer
const storage = multer.diskStorage({

      destination: (req, file, cb) => {
        cb(null, 'uploads/posts/') // specify the upload directory
      },
      filename: (req, file, cb) => {
        cb(null, new Date().toISOString()+'-'+Math.round(Math.random() * 1E9)+'.'+file.mimetype.split('/')[1]) // rename the file
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

const upload = multer({ storage, fileFilter, limits: {
    fileSize: 1024 * 1024, // 1MB limit
  }})

// route middleware
import {
  processContentData,
  processUpdateContentData,
  processFetchAllContentData,
  processFetchContentDataByID,
  processDeleteContentData,
  processFetchContentDataByKeywords,
  processFetchAllContentByUserId
} from '../middleware/pre-processing/index.mjs'

// service
import { mainAccessUser } from '../middleware/service/mainAccessUser.mjs'

// fetch all
router.get('/', processFetchAllContentData, fetchAllContent)

// fetch all post by user ID
router.get('/user', mainAccessUser, processFetchAllContentByUserId, fetchAllContentByUserId)

// save
router.post('/',mainAccessUser, upload.array('thumbnail'), processContentData, saveContent)

// delete
router.delete('/:id', mainAccessUser, processDeleteContentData, deleteContent)

// update
router.patch('/:id',mainAccessUser, upload.array('thumbnail'), processUpdateContentData, updateContent)

// fetch data by id
router.get('/:id', processFetchContentDataByID, fetchContentByID)

// fetch data by keywords
router.post('/keywords', processFetchContentDataByKeywords, fetchContentByKeywords)



// error handling
router.use((err, req, res, next) => {

    // console.error(err.message)

    // // Error Handling file size
    if (err instanceof multer.MulterError) {

      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          status: false,
          message: 'file is too large!. Max 1MB!'
        });
      }
      return res.status(400).json({
      success: false,
      message: `upload failure : ${err.message}`
    });
  }

    next();
});

export default router