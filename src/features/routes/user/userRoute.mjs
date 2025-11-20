import  express  from 'express'
const router = express()

// controllers
import { fetchAllUser, deleteUser } from '../../controllers/userController.mjs'

// middleware
import { verifyDeleteUserData, verifyFetchAllUserData, verifyUpdateUserData } from './middleware/index.mjs'

// service
import { deleteAccessUser } from '../../service/deleteAccessUser.mjs'
import { fetchAccessUser } from '../../service/fetchAccessUser.mjs'

// route helpers
import { upload } from './helpers/_set_multer.mjs'


// fetch all user
router.get('/', fetchAccessUser, verifyFetchAllUserData, fetchAllUser)

// update user
router.patch('/:id', upload.array('avatar'), verifyUpdateUserData)

// delete user
router.delete('/:id', deleteAccessUser, verifyDeleteUserData, deleteUser)

export default router