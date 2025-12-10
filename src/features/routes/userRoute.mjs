import  { Router }  from 'express'
const router = Router()
import multer from 'multer'
import fs from 'fs'
import path from 'path'

// controllers
import { fetchAllUser, deleteUser, updateUser, fetchUserByID, updateUserRole } from '../controllers/userController.mjs'

// middleware
import { 
    processDeleteUserData,
    processFetchAllUserData, 
    processUpdateUserData, 
    processFetchUserDataByID,
    processUpdateUserRoleData
} from '../middleware/pre-processing/index.mjs'

// service
import { mainAccessAdmin } from '../middleware/service/mainAccessAdmin.mjs'
import { mainAccessUser } from '../middleware/service/mainAccessUser.mjs'

// route helpers
// import { upload } from './middleware/user/helpers/_set_multer.mjs'

async function ensureUploadDir() {
    const dir = path.join(process.cwd(), 'uploads/users/')
    try {
      await fs.promises.access(dir)
    } catch (err) {
      console.log(err)
      await fs.promises.mkdir(dir, { recursive: true })
    }
}
ensureUploadDir()

// configure storage for multer
const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'uploads/users/') // specify the upload directory
      },
      filename: (req, file, cb) => {
        cb(null, new Date().toISOString()+'-'+Math.round(Math.random() * 1E9)+'.'+file.mimetype.split('/')[1]); // rename the file
      }
  })
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


// fetch all user
router.get('/', mainAccessAdmin, processFetchAllUserData, fetchAllUser)

// fetch user by ID
router.get('/:id', mainAccessAdmin, processFetchUserDataByID, fetchUserByID)

// update user
router.patch('/:id',mainAccessUser, upload.array('avatar'), processUpdateUserData, updateUser)

// delete user
router.delete('/:id', mainAccessAdmin, processDeleteUserData, deleteUser)

// update user role
router.patch('/role/:id', mainAccessAdmin, processUpdateUserRoleData, updateUserRole)

export default router