import  express  from 'express'
const router = express()

// controllers
import { 
  fetchAll, 
  saveToDatabase, 
  deleteToDatabase, 
  updateToDatabase, 
  fetchDataByID,
  fetchDataByKeywords
} from '../../controllers/postal_controller.mjs'

// local helpers
import { upload } from './helpers/_set_multer.mjs';

// local middleware
import { bridgeToDatabase, bridgeToUpdate,  bridgeFetchAll, bridgeFetchDataByID, bridgeToDelete, bridgeFetchDataByKeywords } from './middleware/main.mjs'

// fetch all
router.get('/', bridgeFetchAll, fetchAll)

// save
router.post('/',upload.array('thumbnail'), bridgeToDatabase, saveToDatabase)

// delete
router.delete('/:id', bridgeToDelete, deleteToDatabase)

// update
router.patch('/:id', upload.array('thumbnail'), bridgeToUpdate, updateToDatabase)

// fetch data by id
router.get('/:id', bridgeFetchDataByID, fetchDataByID)

// fetch data by keywords
router.post('/keywords', bridgeFetchDataByKeywords, fetchDataByKeywords)

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