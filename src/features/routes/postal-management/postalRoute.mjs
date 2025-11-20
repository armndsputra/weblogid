import  express  from 'express'
const router = express()

// controllers
import { 
  fetchAllContent, 
  saveContent, 
  deleteContent, 
  updateContent, 
  fetchContentByID,
  fetchContentByKeywords
} from '../../controllers/postalController.mjs'

// route helpers
import { upload } from './helpers/_set_multer.mjs'

// route middleware
import {
  verifyContentData,
  verifyUpdateContentData,
  verifyFetchAllContentData,
  verifyFetchContentDataByID,
  verifyDeleteContentData,
  verifyFetchContentDataByKeywords
} from './middleware/index.mjs'

// fetch all
router.get('/', verifyFetchAllContentData, fetchAllContent)

// save
router.post('/',upload.array('thumbnail'), verifyContentData, saveContent)

// delete
router.delete('/:id', verifyDeleteContentData, deleteContent)

// update
router.patch('/:id', upload.array('thumbnail'), verifyUpdateContentData, updateContent)

// fetch data by id
router.get('/:id', verifyFetchContentDataByID, fetchContentByID)

// fetch data by keywords
router.post('/keywords', verifyFetchContentDataByKeywords, fetchContentByKeywords)

// error handling
router.use((err, req, res, next) => {

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