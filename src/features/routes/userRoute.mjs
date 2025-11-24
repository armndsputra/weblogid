import  express  from 'express'
const router = express()

// controllers
import { fetchAllUser, deleteUser, updateUser } from '../controllers/userController.mjs'

// middleware
import { verifyDeleteUserData, verifyFetchAllUserData, verifyUpdateUserData } from './middleware/index.mjs'

// service
import { deleteAccessUser } from '../service/deleteAccessUser.mjs'
import { fetchAccessUser } from '../service/fetchAccessUser.mjs'
import { updateAccessUser } from '../service/updateAccessUser.mjs'

// route helpers
import { upload } from './middleware/user/helpers/_set_multer.mjs'


// fetch all user
router.get('/', fetchAccessUser, verifyFetchAllUserData, fetchAllUser)

// update user
router.patch('/:id',updateAccessUser, upload.array('avatar'), verifyUpdateUserData, updateUser)

// delete user
router.delete('/:id', deleteAccessUser, verifyDeleteUserData, deleteUser)

export default router